from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

GOOGLE_PLACES_API_KEY = os.environ['GOOGLE_PLACES_API_KEY']
PLACES_TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"

app = FastAPI(title="Yrvante Lead Finder")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SearchRequest(BaseModel):
    branche: str
    stad: str


class Lead(BaseModel):
    naam: str
    adres: str
    telefoonnummer: Optional[str] = None
    google_maps_url: str
    place_id: str


class SearchResponse(BaseModel):
    totaal_gevonden: int
    leads: List[Lead]


async def fetch_places_page(query: str, page_token: Optional[str] = None) -> dict:
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": (
            "places.id,"
            "places.displayName,"
            "places.formattedAddress,"
            "places.nationalPhoneNumber,"
            "places.websiteUri,"
            "places.googleMapsUri,"
            "nextPageToken"
        ),
    }
    body = {"textQuery": query, "languageCode": "nl"}
    if page_token:
        body["pageToken"] = page_token

    async with httpx.AsyncClient(timeout=30.0) as http:
        resp = await http.post(PLACES_TEXT_SEARCH_URL, json=body, headers=headers)
        resp.raise_for_status()
        return resp.json()


@api_router.post("/zoek", response_model=SearchResponse)
async def zoek_leads(req: SearchRequest):
    branche = req.branche.strip()
    stad = req.stad.strip()
    if not branche or not stad:
        raise HTTPException(status_code=422, detail="Branche en stad zijn verplicht.")

    query = f"{branche} in {stad}"
    all_places = []

    try:
        # Fetch up to 3 pages (max 60 results)
        page_token = None
        for _ in range(3):
            data = await fetch_places_page(query, page_token)
            places = data.get("places", [])
            all_places.extend(places)
            page_token = data.get("nextPageToken")
            if not page_token:
                break
    except httpx.HTTPStatusError as e:
        logger.error(f"Google Places API error: {e.response.status_code} - {e.response.text}")
        raise HTTPException(status_code=502, detail=f"Google Places API fout: {e.response.status_code}")
    except Exception as e:
        logger.error(f"Search error: {str(e)}")
        raise HTTPException(status_code=500, detail="Zoekfout. Probeer opnieuw.")

    leads = []
    for place in all_places:
        # Only include businesses WITHOUT a website
        if place.get("websiteUri"):
            continue

        naam = place.get("displayName", {}).get("text", "Onbekend")
        adres = place.get("formattedAddress", "")
        telefoon = place.get("nationalPhoneNumber")
        maps_url = place.get("googleMapsUri", f"https://maps.google.com/maps?place_id={place.get('id', '')}")
        place_id = place.get("id", "")

        leads.append(Lead(
            naam=naam,
            adres=adres,
            telefoonnummer=telefoon,
            google_maps_url=maps_url,
            place_id=place_id,
        ))

    return SearchResponse(totaal_gevonden=len(all_places), leads=leads)


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
