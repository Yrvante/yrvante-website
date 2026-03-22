from fastapi import FastAPI, APIRouter, HTTPException, Response, Request
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
import uuid
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

GOOGLE_PLACES_API_KEY = os.environ['GOOGLE_PLACES_API_KEY']
PLACES_TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"

# Google Sheets OAuth (optional, loaded if set)
GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_SHEETS_CLIENT_ID', '')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_SHEETS_CLIENT_SECRET', '')
SHEETS_REDIRECT_URI = os.environ.get('SHEETS_REDIRECT_URI', '')
SHEETS_SCOPES = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/spreadsheets"
]

app = FastAPI(title="Yrvante Lead Finder")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ─── Models ────────────────────────────────────────────────────────────────────

class SearchRequest(BaseModel):
    branche: str
    stad: str
    page_token: Optional[str] = None  # for pagination


class Lead(BaseModel):
    naam: str
    adres: str
    telefoonnummer: Optional[str] = None
    google_maps_url: str
    place_id: str


class SearchResponse(BaseModel):
    totaal_gevonden: int
    leads: List[Lead]
    next_page_token: Optional[str] = None


class SavedLead(BaseModel):
    id: str
    naam: str
    adres: str
    telefoonnummer: Optional[str] = None
    google_maps_url: str
    place_id: str
    branche: str
    stad: str
    status: str = "Nieuw"
    notitie: Optional[str] = None
    opgeslagen_op: str


class SaveLeadRequest(BaseModel):
    naam: str
    adres: str
    telefoonnummer: Optional[str] = None
    google_maps_url: str
    place_id: str
    branche: str
    stad: str


class UpdateLeadRequest(BaseModel):
    status: Optional[str] = None
    notitie: Optional[str] = None


class SheetsConfigRequest(BaseModel):
    spreadsheet_id: str


# ─── Google Places helpers ──────────────────────────────────────────────────────

async def fetch_places_page(query: str, page_token: Optional[str] = None) -> dict:
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": (
            "places.id,places.displayName,places.formattedAddress,"
            "places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri,nextPageToken"
        ),
    }
    body = {"textQuery": query, "languageCode": "nl"}
    if page_token:
        body["pageToken"] = page_token
    async with httpx.AsyncClient(timeout=30.0) as http:
        resp = await http.post(PLACES_TEXT_SEARCH_URL, json=body, headers=headers)
        resp.raise_for_status()
        return resp.json()


# ─── Search ────────────────────────────────────────────────────────────────────

@api_router.post("/zoek", response_model=SearchResponse)
async def zoek_leads(req: SearchRequest):
    branche = req.branche.strip()
    stad = req.stad.strip()
    if not branche or not stad:
        raise HTTPException(status_code=422, detail="Branche en stad zijn verplicht.")

    query = f"{branche} in {stad}"
    all_places = []
    next_token = None

    try:
        # If page_token provided, fetch that page only
        # Otherwise fetch first page only and return nextPageToken for "Laad meer"
        data = await fetch_places_page(query, req.page_token)
        places = data.get("places", [])
        all_places.extend(places)
        next_token = data.get("nextPageToken")
    except httpx.HTTPStatusError as e:
        logger.error(f"Places API error: {e.response.status_code}")
        raise HTTPException(status_code=502, detail=f"Google Places API fout: {e.response.status_code}")
    except Exception as e:
        logger.error(f"Search error: {str(e)}")
        raise HTTPException(status_code=500, detail="Zoekfout. Probeer opnieuw.")

    # Save to search history only on first page (no page_token)
    if not req.page_token:
        # Store only unique branche+stad combos (upsert by date)
        await db.search_history.update_one(
            {"branche": branche, "stad": stad},
            {"$set": {"totaal": len(all_places), "datum": datetime.now(timezone.utc).isoformat()}},
            upsert=True
        )

    leads = []
    for place in all_places:
        if place.get("websiteUri"):
            continue
        leads.append(Lead(
            naam=place.get("displayName", {}).get("text", "Onbekend"),
            adres=place.get("formattedAddress", ""),
            telefoonnummer=place.get("nationalPhoneNumber"),
            google_maps_url=place.get("googleMapsUri", f"https://maps.google.com/maps?place_id={place.get('id', '')}"),
            place_id=place.get("id", ""),
        ))

    return SearchResponse(
        totaal_gevonden=len(all_places),
        leads=leads,
        next_page_token=next_token
    )


# ─── Saved Leads ───────────────────────────────────────────────────────────────

@api_router.post("/leads", response_model=SavedLead)
async def save_lead(req: SaveLeadRequest):
    # Check if already saved
    existing = await db.saved_leads.find_one({"place_id": req.place_id}, {"_id": 0})
    if existing:
        return SavedLead(**existing)

    lead_id = str(uuid.uuid4())
    doc = {
        "id": lead_id,
        "naam": req.naam,
        "adres": req.adres,
        "telefoonnummer": req.telefoonnummer,
        "google_maps_url": req.google_maps_url,
        "place_id": req.place_id,
        "branche": req.branche,
        "stad": req.stad,
        "status": "Nieuw",
        "notitie": None,
        "opgeslagen_op": datetime.now(timezone.utc).isoformat()
    }
    await db.saved_leads.insert_one(doc)
    return SavedLead(**doc)


@api_router.get("/leads", response_model=List[SavedLead])
async def get_leads(status: Optional[str] = None):
    query = {}
    if status:
        query["status"] = status
    leads = await db.saved_leads.find(query, {"_id": 0}).to_list(1000)
    return [SavedLead(**l) for l in leads]


@api_router.put("/leads/{lead_id}", response_model=SavedLead)
async def update_lead(lead_id: str, req: UpdateLeadRequest):
    update = {}
    if req.status is not None:
        update["status"] = req.status
    if req.notitie is not None:
        update["notitie"] = req.notitie
    if not update:
        raise HTTPException(status_code=422, detail="Niets om te updaten.")
    result = await db.saved_leads.find_one_and_update(
        {"id": lead_id}, {"$set": update},
        return_document=True, projection={"_id": 0}
    )
    if not result:
        raise HTTPException(status_code=404, detail="Lead niet gevonden.")
    return SavedLead(**result)


@api_router.delete("/leads/{lead_id}")
async def delete_lead(lead_id: str):
    result = await db.saved_leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead niet gevonden.")
    return {"message": "Verwijderd"}


# ─── Dashboard ─────────────────────────────────────────────────────────────────

@api_router.get("/dashboard")
async def get_dashboard():
    totaal = await db.saved_leads.count_documents({})
    nieuw = await db.saved_leads.count_documents({"status": "Nieuw"})
    gebeld = await db.saved_leads.count_documents({"status": "Gebeld"})
    offerte = await db.saved_leads.count_documents({"status": "Offerte gestuurd"})
    klant = await db.saved_leads.count_documents({"status": "Klant geworden"})

    # Recent searches — deduplicated by branche+stad, most recent first
    pipeline_history = [
        {"$sort": {"datum": -1}},
        {"$group": {
            "_id": {"branche": "$branche", "stad": "$stad"},
            "totaal": {"$first": "$totaal"},
            "datum": {"$first": "$datum"}
        }},
        {"$sort": {"datum": -1}},
        {"$limit": 5},
        {"$project": {"_id": 0, "branche": "$_id.branche", "stad": "$_id.stad", "totaal": 1, "datum": 1}}
    ]
    recente_zoekopdrachten = await db.search_history.aggregate(pipeline_history).to_list(5)

    # Top branchen
    pipeline = [
        {"$group": {"_id": "$branche", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 5}
    ]
    top_branchen = await db.saved_leads.aggregate(pipeline).to_list(5)

    return {
        "totaal_opgeslagen": totaal,
        "status_verdeling": {
            "Nieuw": nieuw,
            "Gebeld": gebeld,
            "Offerte gestuurd": offerte,
            "Klant geworden": klant
        },
        "recente_zoekopdrachten": recente_zoekopdrachten,
        "top_branchen": [{"branche": b["_id"], "aantal": b["count"]} for b in top_branchen]
    }


# ─── Google Sheets OAuth ────────────────────────────────────────────────────────

@api_router.get("/sheets/status")
async def sheets_status():
    configured = bool(GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET)
    token = await db.sheets_tokens.find_one({"id": "sheets_token"}, {"_id": 0})
    spreadsheet_id = token.get("spreadsheet_id") if token else None
    return {
        "configured": configured,
        "connected": bool(token and token.get("access_token")),
        "spreadsheet_id": spreadsheet_id
    }


@api_router.get("/sheets/login")
async def sheets_login():
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=400, detail="Google Sheets niet geconfigureerd. Voeg GOOGLE_SHEETS_CLIENT_ID en GOOGLE_SHEETS_CLIENT_SECRET toe.")
    try:
        from google_auth_oauthlib.flow import Flow
        flow = Flow.from_client_config({
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token"
            }
        }, scopes=SHEETS_SCOPES, redirect_uri=SHEETS_REDIRECT_URI)
        url, state = flow.authorization_url(access_type='offline', prompt='consent')
        await db.sheets_tokens.update_one({"id": "sheets_state"}, {"$set": {"state": state}}, upsert=True)
        return {"auth_url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/sheets/callback")
async def sheets_callback(code: str, state: str):
    try:
        import warnings
        from google_auth_oauthlib.flow import Flow
        state_doc = await db.sheets_tokens.find_one({"id": "sheets_state"})
        if not state_doc or state_doc.get("state") != state:
            raise HTTPException(status_code=400, detail="Ongeldige state.")
        flow = Flow.from_client_config({
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token"
            }
        }, scopes=SHEETS_SCOPES, redirect_uri=SHEETS_REDIRECT_URI)
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            flow.fetch_token(code=code)
        creds = flow.credentials
        await db.sheets_tokens.update_one({"id": "sheets_token"}, {"$set": {
            "id": "sheets_token",
            "access_token": creds.token,
            "refresh_token": creds.refresh_token,
            "token_uri": creds.token_uri,
            "client_id": creds.client_id,
            "client_secret": creds.client_secret,
        }}, upsert=True)
        frontend_url = os.environ.get('REACT_APP_BACKEND_URL', '')
        return RedirectResponse(url="/#sheets-connected")
    except Exception as e:
        logger.error(f"Sheets callback error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/sheets/spreadsheet")
async def set_spreadsheet(req: SheetsConfigRequest):
    await db.sheets_tokens.update_one({"id": "sheets_token"}, {"$set": {"spreadsheet_id": req.spreadsheet_id}}, upsert=True)
    return {"message": "Spreadsheet ID opgeslagen", "spreadsheet_id": req.spreadsheet_id}


@api_router.post("/sheets/append/{lead_id}")
async def append_lead_to_sheets(lead_id: str):
    token_doc = await db.sheets_tokens.find_one({"id": "sheets_token"}, {"_id": 0})
    if not token_doc or not token_doc.get("access_token"):
        raise HTTPException(status_code=401, detail="Niet verbonden met Google Sheets. Log eerst in.")
    spreadsheet_id = token_doc.get("spreadsheet_id")
    if not spreadsheet_id:
        raise HTTPException(status_code=400, detail="Geen spreadsheet ID ingesteld.")

    lead = await db.saved_leads.find_one({"id": lead_id}, {"_id": 0})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead niet gevonden.")

    try:
        import asyncio
        from google.oauth2.credentials import Credentials
        from googleapiclient.discovery import build
        from datetime import datetime, timezone

        creds = Credentials(
            token=token_doc["access_token"],
            refresh_token=token_doc.get("refresh_token"),
            token_uri=token_doc.get("token_uri", "https://oauth2.googleapis.com/token"),
            client_id=token_doc.get("client_id"),
            client_secret=token_doc.get("client_secret"),
        )

        row = [[
            lead.get("naam", ""),
            lead.get("adres", ""),
            lead.get("telefoonnummer", ""),
            lead.get("branche", ""),
            lead.get("stad", ""),
            lead.get("google_maps_url", ""),
            lead.get("status", "Nieuw"),
            datetime.now(timezone.utc).strftime("%Y-%m-%d")
        ]]

        def write_to_sheets():
            service = build('sheets', 'v4', credentials=creds)
            service.spreadsheets().values().append(
                spreadsheetId=spreadsheet_id,
                range="A:H",
                valueInputOption="RAW",
                insertDataOption="INSERT_ROWS",
                body={"values": row}
            ).execute()

        await asyncio.to_thread(write_to_sheets)
        return {"message": f"{lead['naam']} toegevoegd aan Google Sheets"}
    except Exception as e:
        logger.error(f"Sheets append error: {e}")
        raise HTTPException(status_code=500, detail=f"Sheets fout: {str(e)}")


@api_router.post("/sheets/append-all")
async def append_all_to_sheets():
    token_doc = await db.sheets_tokens.find_one({"id": "sheets_token"}, {"_id": 0})
    if not token_doc or not token_doc.get("access_token"):
        raise HTTPException(status_code=401, detail="Niet verbonden met Google Sheets.")
    spreadsheet_id = token_doc.get("spreadsheet_id")
    if not spreadsheet_id:
        raise HTTPException(status_code=400, detail="Geen spreadsheet ID ingesteld.")

    leads = await db.saved_leads.find({}, {"_id": 0}).to_list(1000)
    if not leads:
        raise HTTPException(status_code=400, detail="Geen opgeslagen leads om te exporteren.")

    try:
        import asyncio
        from google.oauth2.credentials import Credentials
        from googleapiclient.discovery import build

        creds = Credentials(
            token=token_doc["access_token"],
            refresh_token=token_doc.get("refresh_token"),
            token_uri=token_doc.get("token_uri", "https://oauth2.googleapis.com/token"),
            client_id=token_doc.get("client_id"),
            client_secret=token_doc.get("client_secret"),
        )

        header = [["Naam", "Adres", "Telefoonnummer", "Branche", "Stad", "Google Maps", "Status", "Datum"]]
        rows = [[
            l.get("naam", ""), l.get("adres", ""), l.get("telefoonnummer", ""),
            l.get("branche", ""), l.get("stad", ""), l.get("google_maps_url", ""),
            l.get("status", ""), l.get("opgeslagen_op", "")[:10] if l.get("opgeslagen_op") else ""
        ] for l in leads]

        def write_all():
            service = build('sheets', 'v4', credentials=creds)
            service.spreadsheets().values().append(
                spreadsheetId=spreadsheet_id,
                range="A:H",
                valueInputOption="RAW",
                insertDataOption="INSERT_ROWS",
                body={"values": header + rows}
            ).execute()

        await asyncio.to_thread(write_all)
        return {"message": f"{len(leads)} leads geëxporteerd naar Google Sheets"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sheets fout: {str(e)}")


# ─── Share Report ──────────────────────────────────────────────────────────────

class ShareReport(BaseModel):
    token: str
    titel: str
    leads: List[SavedLead]
    aangemaakt_op: str
    totaal: int


@api_router.post("/share")
async def create_share(titel: Optional[str] = "Leadoverzicht"):
    token = str(uuid.uuid4().hex[:12])
    leads = await db.saved_leads.find({}, {"_id": 0}).to_list(1000)
    doc = {
        "token": token,
        "titel": titel,
        "leads": leads,
        "aangemaakt_op": datetime.now(timezone.utc).isoformat(),
        "totaal": len(leads)
    }
    await db.share_reports.insert_one(doc)
    return {"token": token, "url": f"/share/{token}"}


@api_router.get("/share/{token}")
async def get_share(token: str):
    doc = await db.share_reports.find_one({"token": token}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Rapport niet gevonden.")
    return doc


# ─── Misc ──────────────────────────────────────────────────────────────────────

@api_router.get("/history")
async def get_history():
    history = await db.search_history.find({}, {"_id": 0}).sort("datum", -1).limit(20).to_list(20)
    return history


@api_router.get("/")
async def root():
    return {"message": "Yrvante Lead Finder API"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
