from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import random
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'yvar@yrvante.com')

# Admin password (simple for now)
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'yrvante2025')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False
    read: bool = False

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

class PageView(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    page: str
    visitor_id: str
    user_agent: str = ""
    ip_address: str = ""
    referrer: str = ""
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PageViewCreate(BaseModel):
    page: str
    visitor_id: str
    referrer: Optional[str] = ""

class AdminLogin(BaseModel):
    password: str

class AdminStats(BaseModel):
    total_page_views: int
    unique_visitors: int
    total_contacts: int
    unread_contacts: int
    page_views_today: int
    page_views_week: int
    contacts_today: int
    contacts_week: int

# Routes
@api_router.get("/")
async def root():
    return {"message": "Yrvante API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(input: ContactSubmissionCreate):
    """Handle contact form submission and send email notification"""
    try:
        submission_obj = ContactSubmission(
            name=input.name,
            email=input.email,
            phone=input.phone or "",
            message=input.message
        )
        
        doc = submission_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        email_sent = False
        if resend.api_key:
            try:
                # Format message with proper line breaks
                formatted_message = input.message.replace('\n', '<br>')
                
                phone_line = f"""
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                            <span style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefoon</span><br>
                            <span style="font-size: 16px; color: #000;">{input.phone}</span>
                        </td>
                    </tr>
                """ if input.phone else ""
                
                html_content = f"""
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                    <!-- Header -->
                                    <tr>
                                        <td style="background-color: #000; padding: 30px 40px;">
                                            <h1 style="margin: 0; color: #fff; font-size: 24px; font-weight: 700;">YRVANTE</h1>
                                            <p style="margin: 8px 0 0 0; color: #999; font-size: 14px;">Nieuwe Website Aanvraag</p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <!-- Klant Gegevens -->
                                                <tr>
                                                    <td style="padding-bottom: 30px;">
                                                        <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">Klant Gegevens</h2>
                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                                                                    <span style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Naam</span><br>
                                                                    <span style="font-size: 16px; color: #000; font-weight: 600;">{input.name}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                                                                    <span style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</span><br>
                                                                    <a href="mailto:{input.email}" style="font-size: 16px; color: #000; text-decoration: none;">{input.email}</a>
                                                                </td>
                                                            </tr>
                                                            {phone_line}
                                                        </table>
                                                    </td>
                                                </tr>
                                                
                                                <!-- Aanvraag Details -->
                                                <tr>
                                                    <td>
                                                        <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">Aanvraag Details</h2>
                                                        <div style="background-color: #f9f9f9; border-radius: 12px; padding: 20px; font-size: 15px; line-height: 1.6; color: #333;">
                                                            {formatted_message}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #f9f9f9; padding: 20px 40px; border-top: 1px solid #eee;">
                                            <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
                                                Dit bericht werd verzonden via het contactformulier op yrvante.com
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
                """
                
                params = {
                    "from": f"Yrvante <{SENDER_EMAIL}>",
                    "to": [RECIPIENT_EMAIL],
                    "subject": f"🚀 Nieuwe aanvraag van {input.name}",
                    "html": html_content,
                    "reply_to": input.email
                }
                
                await asyncio.to_thread(resend.Emails.send, params)
                email_sent = True
                logger.info(f"Email notification sent for contact from {input.email}")
            except Exception as e:
                logger.error(f"Failed to send email notification: {str(e)}")
        
        doc['email_sent'] = email_sent
        await db.contact_submissions.insert_one(doc)
        
        return ContactResponse(
            success=True,
            message="Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op."
        )
        
    except Exception as e:
        logger.error(f"Error processing contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Er is een fout opgetreden. Probeer het later opnieuw.")

# Analytics endpoints
@api_router.post("/analytics/pageview")
async def track_pageview(input: PageViewCreate, request: Request):
    """Track a page view"""
    try:
        pageview = PageView(
            page=input.page,
            visitor_id=input.visitor_id,
            user_agent=request.headers.get("user-agent", ""),
            ip_address=request.client.host if request.client else "",
            referrer=input.referrer or ""
        )
        
        doc = pageview.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        await db.page_views.insert_one(doc)
        return {"success": True}
    except Exception as e:
        logger.error(f"Error tracking pageview: {str(e)}")
        return {"success": False}

# Admin endpoints
@api_router.post("/admin/login")
async def admin_login(input: AdminLogin):
    """Simple admin authentication"""
    if input.password == ADMIN_PASSWORD:
        return {"success": True, "token": "admin_authenticated"}
    raise HTTPException(status_code=401, detail="Ongeldig wachtwoord")

@api_router.get("/admin/stats", response_model=AdminStats)
async def get_admin_stats():
    """Get dashboard statistics"""
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=7)
    
    # Total page views
    total_page_views = await db.page_views.count_documents({})
    
    # Unique visitors
    unique_visitors = len(await db.page_views.distinct("visitor_id"))
    
    # Total contacts
    total_contacts = await db.contact_submissions.count_documents({})
    
    # Unread contacts
    unread_contacts = await db.contact_submissions.count_documents({"read": False})
    
    # Page views today
    page_views_today = await db.page_views.count_documents({
        "timestamp": {"$gte": today_start.isoformat()}
    })
    
    # Page views this week
    page_views_week = await db.page_views.count_documents({
        "timestamp": {"$gte": week_start.isoformat()}
    })
    
    # Contacts today
    contacts_today = await db.contact_submissions.count_documents({
        "timestamp": {"$gte": today_start.isoformat()}
    })
    
    # Contacts this week
    contacts_week = await db.contact_submissions.count_documents({
        "timestamp": {"$gte": week_start.isoformat()}
    })
    
    return AdminStats(
        total_page_views=total_page_views,
        unique_visitors=unique_visitors,
        total_contacts=total_contacts,
        unread_contacts=unread_contacts,
        page_views_today=page_views_today,
        page_views_week=page_views_week,
        contacts_today=contacts_today,
        contacts_week=contacts_week
    )

@api_router.get("/admin/contacts")
async def get_all_contacts():
    """Get all contact submissions for admin"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).sort("timestamp", -1).to_list(1000)
    for sub in submissions:
        if isinstance(sub['timestamp'], str):
            sub['timestamp'] = datetime.fromisoformat(sub['timestamp'])
    return submissions

@api_router.put("/admin/contacts/{contact_id}/read")
async def mark_contact_read(contact_id: str):
    """Mark a contact as read"""
    result = await db.contact_submissions.update_one(
        {"id": contact_id},
        {"$set": {"read": True}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Contact niet gevonden")
    return {"success": True}

@api_router.delete("/admin/contacts/{contact_id}")
async def delete_contact(contact_id: str):
    """Delete a contact submission"""
    result = await db.contact_submissions.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact niet gevonden")
    return {"success": True}

@api_router.get("/admin/pageviews")
async def get_pageviews():
    """Get page view analytics"""
    # Get page views grouped by date (last 30 days)
    now = datetime.now(timezone.utc)
    thirty_days_ago = now - timedelta(days=30)
    
    pageviews = await db.page_views.find(
        {"timestamp": {"$gte": thirty_days_ago.isoformat()}},
        {"_id": 0}
    ).sort("timestamp", -1).to_list(1000)
    
    # Group by date
    daily_views = {}
    for pv in pageviews:
        date = pv['timestamp'][:10] if isinstance(pv['timestamp'], str) else pv['timestamp'].strftime('%Y-%m-%d')
        daily_views[date] = daily_views.get(date, 0) + 1
    
    # Get page breakdown
    page_breakdown = {}
    for pv in pageviews:
        page = pv.get('page', '/')
        page_breakdown[page] = page_breakdown.get(page, 0) + 1
    
    return {
        "daily_views": daily_views,
        "page_breakdown": page_breakdown,
        "total": len(pageviews)
    }

# =====================
# Lead Finder Endpoints (for preview environment)
# =====================

class LeadFinderAuth(BaseModel):
    password: str

class LeadCreate(BaseModel):
    naam: str
    adres: Optional[str] = ""
    telefoonnummer: Optional[str] = ""
    google_maps_url: Optional[str] = ""
    place_id: Optional[str] = ""
    branche: Optional[str] = ""
    stad: Optional[str] = ""

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    notitie: Optional[str] = None

@api_router.post("/admin/leadfinder/auth")
async def leadfinder_auth(data: LeadFinderAuth):
    if data.password == ADMIN_PASSWORD:
        return {"success": True}
    return {"success": False, "error": "Ongeldig wachtwoord"}

@api_router.post("/admin/leadfinder/zoek")
async def leadfinder_zoek(request: Request):
    """Search for businesses without websites using Google Places API"""
    body = await request.json()
    branche = body.get("branche", "")
    stad = body.get("stad", "")
    radius = body.get("radius", 25)
    search_all = body.get("searchAll", False)
    filters = body.get("filters", {})
    
    if not stad:
        raise HTTPException(status_code=400, detail="Stad is verplicht")
    
    # ZZP branches voor mock data
    zzp_branches = [
        "Kapper", "Schoonheidsspecialist", "Nagelstudio", "Masseur",
        "Fotograaf", "Grafisch Ontwerper", "Schilder", "Loodgieter",
        "Elektricien", "Timmerman", "Tuinman", "Schoonmaker",
        "Personal Trainer", "Yoga Instructeur", "Coach", "Boekhouder"
    ]
    
    # Steden in de buurt van de opgegeven stad (mock)
    nearby_cities = {
        "almelo": ["Wierden", "Vriezenveen", "Tubbergen", "Rijssen", "Borne", "Hengelo", "Oldenzaal"],
        "amsterdam": ["Amstelveen", "Zaandam", "Haarlem", "Hoofddorp", "Diemen", "Ouderkerk"],
        "rotterdam": ["Schiedam", "Vlaardingen", "Capelle", "Barendrecht", "Ridderkerk"],
        "enschede": ["Hengelo", "Oldenzaal", "Haaksbergen", "Losser", "Gronau"],
    }
    
    stad_lower = stad.lower()
    extra_cities = nearby_cities.get(stad_lower, ["Omgeving " + stad])
    
    mock_leads = []
    
    if search_all:
        # Generate more diverse mock results for "Zoek Alles"
        for i, branch in enumerate(zzp_branches[:12]):
            city = stad if i % 2 == 0 else extra_cities[i % len(extra_cities)]
            mock_leads.append({
                "place_id": f"mock_{uuid.uuid4().hex[:8]}",
                "naam": f"{branch} {['Studio', 'Praktijk', 'Service', 'ZZP', ''][i % 5]} {city}".strip(),
                "adres": f"Voorbeeldstraat {i+1}, {city}",
                "telefoonnummer": f"+31 6 {random.randint(10000000, 99999999)}",
                "google_maps_url": f"https://maps.google.com/?q={branch}+{city}",
                "source": "google",
                "types": ["establishment", "point_of_interest"],
                "matchedQuery": branch.lower()
            })
    else:
        # Standard search with branch
        search_term = branche if branche else "bedrijf"
        for i in range(5):
            city = stad if i < 3 else extra_cities[i % len(extra_cities)]
            mock_leads.append({
                "place_id": f"mock_{uuid.uuid4().hex[:8]}",
                "naam": f"{search_term.title()} {['De Vakman', 'Pro', 'Service', 'Plus', 'Expert'][i]} {city}",
                "adres": f"Hoofdstraat {10 + i * 5}, {city}",
                "telefoonnummer": f"+31 6 {random.randint(10000000, 99999999)}",
                "google_maps_url": f"https://maps.google.com/?q={search_term}+{city}",
                "source": "google",
                "types": ["establishment"]
            })
    
    return {
        "leads": mock_leads,
        "totaal_gevonden": len(mock_leads),
        "nextPageToken": None,
        "zoekgebied": f"{stad} + {radius}km radius",
        "bronnen_doorzocht": ["Google Maps (Mock)", "ZZP Database (Mock)"] if search_all else ["Google Maps (Mock)"],
        "note": f"Dit zijn voorbeeldresultaten voor {stad} + {radius}km. Echte zoekresultaten werken na deployment op Vercel."
    }

@api_router.get("/admin/leadfinder/leads")
async def get_leads():
    leads = await db.leadfinder_leads.find().sort("opgeslagen_op", -1).to_list(1000)
    for lead in leads:
        lead["id"] = str(lead.pop("_id"))
    return {"leads": leads}

@api_router.post("/admin/leadfinder/leads")
async def create_lead(lead: LeadCreate):
    # Check if lead already exists
    if lead.place_id:
        existing = await db.leadfinder_leads.find_one({"place_id": lead.place_id})
        if existing:
            return {"error": "Lead bestaat al"}
    
    lead_doc = {
        "naam": lead.naam,
        "adres": lead.adres,
        "telefoonnummer": lead.telefoonnummer,
        "google_maps_url": lead.google_maps_url,
        "place_id": lead.place_id,
        "branche": lead.branche,
        "stad": lead.stad,
        "status": "nieuw",
        "notitie": "",
        "opgeslagen_op": datetime.now(timezone.utc)
    }
    result = await db.leadfinder_leads.insert_one(lead_doc)
    return {"id": str(result.inserted_id)}

@api_router.put("/admin/leadfinder/lead/{lead_id}")
async def update_lead(lead_id: str, data: LeadUpdate):
    from bson import ObjectId
    update_doc = {}
    if data.status is not None:
        update_doc["status"] = data.status
    if data.notitie is not None:
        update_doc["notitie"] = data.notitie
    
    if update_doc:
        await db.leadfinder_leads.update_one({"_id": ObjectId(lead_id)}, {"$set": update_doc})
    return {"success": True}

@api_router.delete("/admin/leadfinder/lead/{lead_id}")
async def delete_lead(lead_id: str):
    from bson import ObjectId
    await db.leadfinder_leads.delete_one({"_id": ObjectId(lead_id)})
    return {"success": True}

@api_router.get("/admin/leadfinder/dashboard")
async def leadfinder_dashboard():
    leads = await db.leadfinder_leads.find().to_list(1000)
    
    status_verdeling = {}
    for lead in leads:
        status = lead.get("status", "nieuw")
        status_verdeling[status] = status_verdeling.get(status, 0) + 1
    
    return {
        "totaal_leads": len(leads),
        "status_verdeling": status_verdeling,
        "recente_zoekopdrachten": []
    }

# Include the router in the main app
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
