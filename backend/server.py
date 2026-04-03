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
import httpx

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

# Google Places API
GOOGLE_PLACES_API_KEY = os.environ.get('GOOGLE_PLACES_API_KEY')
GOOGLE_PLACE_ID = os.environ.get('GOOGLE_PLACE_ID')

# In-memory cache for reviews
_reviews_cache = {"data": None, "fetched_at": None}

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
    """Search for businesses without websites using multiple sources and synonym expansion"""
    import aiohttp
    import re
    
    body = await request.json()
    branche = body.get("branche", "")
    stad = body.get("stad", "")
    radius = body.get("radius", 25)
    search_all = body.get("searchAll", False)
    filters = body.get("filters", {})
    sources = body.get("sources", ["google", "instagram", "facebook", "linkedin", "telefoongids", "goudengids", "marktplaats", "kvk"])
    
    if not stad:
        raise HTTPException(status_code=400, detail="Stad is verplicht")
    
    # Synonym expansion: map a branche to related search terms
    BRANCHE_SYNONIEMEN = {
        "nagelstudio": ["nagelstudio", "nagels", "nail salon", "manicure", "gelnagels", "pedicure nagels"],
        "kapper": ["kapper", "barbershop", "kapsalon", "hairstylist", "hairdresser", "herenkapper", "dameskapper"],
        "schoonheidssalon": ["schoonheidssalon", "beautysalon", "beauty salon", "schoonheidsspecialiste", "gezichtsbehandeling", "huidverzorging"],
        "fotograaf": ["fotograaf", "fotografie", "photographer", "fotostudio", "bruidsfotograaf", "portretfotograaf"],
        "schilder": ["schilder", "schildersbedrijf", "huisschilder", "verfspecialist", "schilderwerk"],
        "loodgieter": ["loodgieter", "installateur", "sanitair", "loodgieterswerk", "cv ketel", "verwarming installateur"],
        "elektricien": ["elektricien", "elektriciën", "elektra", "elektriciteit", "elektrotechniek"],
        "tuinman": ["tuinman", "hovenier", "tuinonderhoud", "tuinaanleg", "tuinarchitect", "groenvoorziening"],
        "schoonmaker": ["schoonmaker", "schoonmaakbedrijf", "glazenwasser", "reiniging", "cleaning service"],
        "personal trainer": ["personal trainer", "fitness coach", "sportcoach", "fitness instructeur", "personal coaching"],
        "fysiotherapeut": ["fysiotherapeut", "fysiotherapie", "manueel therapeut", "sportfysiotherapie"],
        "coach": ["coach", "life coach", "business coach", "loopbaancoach", "mindset coach", "coaching praktijk"],
        "masseur": ["masseur", "massagepraktijk", "massage therapeut", "sportmassage", "ontspanningsmassage"],
        "autobedrijf": ["autobedrijf", "garage", "automonteur", "autoservice", "apk keuring", "autoschade"],
        "restaurant": ["restaurant", "eetcafe", "bistro", "trattoria", "brasserie", "lunchroom"],
        "cafe": ["cafe", "koffiebar", "coffee shop", "espressobar", "lunchcafe", "grand cafe"],
        "bakker": ["bakker", "bakkerij", "broodbakker", "patisserie", "banketbakker"],
        "slager": ["slager", "slagerij", "vleesspecialist", "poelier"],
        "bloemist": ["bloemist", "bloemenwinkel", "bloemenspecialist", "florist"],
        "dierenarts": ["dierenarts", "dierenkliniek", "dierenpraktijk", "veterinair"],
        "tandarts": ["tandarts", "tandartspraktijk", "mondzorg", "dental"],
        "advocaat": ["advocaat", "advocatenkantoor", "juridisch adviseur", "jurist"],
        "accountant": ["accountant", "boekhouder", "belastingadviseur", "administratiekantoor"],
        "makelaar": ["makelaar", "makelaardij", "vastgoed", "woningmakelaar", "hypotheekadviseur"],
        "webdesigner": ["webdesigner", "webdesign", "website ontwerp", "web developer", "webbureau"],
        "grafisch ontwerper": ["grafisch ontwerper", "graphic designer", "vormgever", "logo ontwerp", "huisstijl"],
        "tattoo": ["tattoo", "tattooshop", "tattoo artist", "tatoeage", "piercing"],
        "yoga": ["yoga", "yogastudio", "yoga docent", "pilates", "meditatie"],
        "rijschool": ["rijschool", "rijinstructeur", "rijles", "autorijschool", "rijbewijs"],
        "hondenuitlaatservice": ["hondenuitlaatservice", "hondentrimmer", "dogwalker", "huisdieren service", "hondensalon"],
    }
    
    base_term = branche.lower().strip() if branche else ""
    
    # Find matching synonyms
    search_terms = [branche] if branche else ["zzp freelancer diensten"]
    used_synonyms = []
    
    if base_term:
        # Check exact match first
        if base_term in BRANCHE_SYNONIEMEN:
            search_terms = BRANCHE_SYNONIEMEN[base_term]
            used_synonyms = search_terms
        else:
            # Check partial match
            for key, synonyms in BRANCHE_SYNONIEMEN.items():
                if base_term in key or key in base_term or any(base_term in s or s in base_term for s in synonyms):
                    search_terms = synonyms
                    used_synonyms = synonyms
                    break
    
    all_leads = []
    scraped_sources = []
    seen_ids = set()
    
    # Helper function for Google search scraping
    async def google_search(query: str, max_results: int = 10):
        results = []
        try:
            url = f"https://www.google.com/search?q={query}&num={max_results}&hl=nl"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    "Accept": "text/html,application/xhtml+xml",
                    "Accept-Language": "nl-NL,nl;q=0.9"
                }) as resp:
                    html = await resp.text()
                    # Extract URLs
                    for match in re.finditer(r'href="/url\?q=([^&"]+)', html):
                        decoded_url = match.group(1)
                        if "google.com" not in decoded_url and "youtube.com" not in decoded_url:
                            results.append(decoded_url)
        except Exception as e:
            logger.error(f"Google search error: {e}")
        return results[:max_results]
    
    # Scrape Instagram
    async def scrape_instagram():
        leads = []
        try:
            for term in search_terms:
                query = f"site:instagram.com {term} {stad}"
                urls = await google_search(query, 8)
                for url in urls:
                    if "instagram.com/" in url and "/p/" not in url and "/reel/" not in url:
                        match = re.search(r'instagram\.com/([^/\?]+)', url)
                        if match:
                            username = match.group(1)
                            if username not in ["explore", "accounts", "about", "legal", "privacy"]:
                                lead_id = f"ig_{username}"
                                if lead_id not in seen_ids:
                                    seen_ids.add(lead_id)
                                    leads.append({
                                        "place_id": lead_id,
                                        "naam": f"@{username}",
                                        "source": "instagram",
                                        "instagram_url": url,
                                        "adres": stad,
                                        "telefoonnummer": None,
                                        "google_maps_url": None
                                    })
        except Exception as e:
            logger.error(f"Instagram scrape error: {e}")
        return leads
    
    # Scrape Facebook
    async def scrape_facebook():
        leads = []
        try:
            for term in search_terms:
                query = f"site:facebook.com {term} {stad}"
                urls = await google_search(query, 8)
                for url in urls:
                    if "facebook.com/" in url and "/posts/" not in url:
                        match = re.search(r'facebook\.com/([^/\?]+)', url)
                        if match:
                            page_name = match.group(1)
                            if page_name not in ["watch", "marketplace", "groups", "events", "gaming", "login"]:
                                lead_id = f"fb_{page_name}"
                                if lead_id not in seen_ids:
                                    seen_ids.add(lead_id)
                                    leads.append({
                                        "place_id": lead_id,
                                        "naam": page_name.replace("-", " ").replace(".", " "),
                                        "source": "facebook",
                                        "facebook_url": url,
                                        "adres": stad,
                                        "telefoonnummer": None,
                                        "google_maps_url": None
                                    })
        except Exception as e:
            logger.error(f"Facebook scrape error: {e}")
        return leads
    
    # Scrape LinkedIn
    async def scrape_linkedin():
        leads = []
        try:
            for term in search_terms:
                query = f"site:linkedin.com/company {term} {stad}"
                urls = await google_search(query, 6)
                for url in urls:
                    if "linkedin.com/company/" in url:
                        match = re.search(r'linkedin\.com/company/([^/\?]+)', url)
                        if match:
                            company = match.group(1)
                            lead_id = f"li_{company}"
                            if lead_id not in seen_ids:
                                seen_ids.add(lead_id)
                                leads.append({
                                    "place_id": lead_id,
                                    "naam": company.replace("-", " "),
                                    "source": "linkedin",
                                    "linkedin_url": url,
                                    "adres": stad,
                                    "telefoonnummer": None,
                                    "google_maps_url": None
                                })
        except Exception as e:
            logger.error(f"LinkedIn scrape error: {e}")
        return leads
    
    # Scrape Telefoongids
    async def scrape_telefoongids():
        leads = []
        seen_urls = set()
        try:
            for term in search_terms:
                query = f"site:detelefoongids.nl {term} {stad}"
                urls = await google_search(query, 6)
                for url in urls:
                    if "detelefoongids.nl" in url and url not in seen_urls:
                        seen_urls.add(url)
                        lead_id = f"tg_{uuid.uuid4().hex[:8]}"
                        leads.append({
                            "place_id": lead_id,
                            "naam": f"Telefoongids - {term}",
                            "source": "telefoongids",
                            "telefoongids_url": url,
                            "adres": stad,
                            "telefoonnummer": None,
                            "google_maps_url": None
                        })
        except Exception as e:
            logger.error(f"Telefoongids scrape error: {e}")
        return leads
    
    # Scrape Gouden Gids
    async def scrape_goudengids():
        leads = []
        seen_urls = set()
        try:
            for term in search_terms:
                query = f"site:goudengids.nl {term} {stad}"
                urls = await google_search(query, 6)
                for url in urls:
                    if "goudengids.nl" in url and url not in seen_urls:
                        seen_urls.add(url)
                        lead_id = f"gg_{uuid.uuid4().hex[:8]}"
                        leads.append({
                            "place_id": lead_id,
                            "naam": f"Gouden Gids - {term}",
                            "source": "goudengids",
                            "goudengids_url": url,
                            "adres": stad,
                            "telefoonnummer": None,
                            "google_maps_url": None
                        })
        except Exception as e:
            logger.error(f"Gouden Gids scrape error: {e}")
        return leads
    
    # Scrape Marktplaats
    async def scrape_marktplaats():
        leads = []
        seen_urls = set()
        try:
            for term in search_terms:
                query = f"site:marktplaats.nl/diensten {term} {stad}"
                urls = await google_search(query, 5)
                for url in urls:
                    if "marktplaats.nl" in url and url not in seen_urls:
                        seen_urls.add(url)
                        lead_id = f"mp_{uuid.uuid4().hex[:8]}"
                        leads.append({
                            "place_id": lead_id,
                            "naam": f"Marktplaats ZZP - {term}",
                            "source": "marktplaats",
                            "marktplaats_url": url,
                            "adres": stad,
                            "telefoonnummer": None,
                            "google_maps_url": None
                        })
        except Exception as e:
            logger.error(f"Marktplaats scrape error: {e}")
        return leads
    
    # Scrape KVK
    async def scrape_kvk():
        leads = []
        seen_urls = set()
        try:
            for term in search_terms:
                query = f"site:kvk.nl {term} {stad}"
                urls = await google_search(query, 5)
                for url in urls:
                    if "kvk.nl" in url and url not in seen_urls:
                        seen_urls.add(url)
                        lead_id = f"kvk_{uuid.uuid4().hex[:8]}"
                        leads.append({
                            "place_id": lead_id,
                            "naam": f"KVK Bedrijf - {term}",
                            "source": "kvk",
                            "kvk_url": url,
                            "adres": stad,
                            "telefoonnummer": None,
                            "google_maps_url": None
                        })
        except Exception as e:
            logger.error(f"KVK scrape error: {e}")
        return leads
    
    # ===== REAL Google Places API Text Search with pagination =====
    async def search_google_places():
        leads = []
        api_key = os.environ.get("GOOGLE_PLACES_API_KEY", "")
        if not api_key:
            logger.warning("No GOOGLE_PLACES_API_KEY set, skipping Google Places")
            return leads
        
        async with aiohttp.ClientSession() as session:
            for term in search_terms[:3]:  # Top 3 synonyms for Places API
                query = f"{term} in {stad}"
                next_token = None
                pages_fetched = 0
                
                while pages_fetched < 3:  # Max 3 pages = ~60 results per term
                    params = {
                        "query": query,
                        "key": api_key,
                        "language": "nl",
                        "region": "nl",
                    }
                    if next_token:
                        params["pagetoken"] = next_token
                        await asyncio.sleep(2)  # Google requires delay between page requests
                    
                    try:
                        url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
                        async with session.get(url, params=params, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                            data = await resp.json()
                        
                        if data.get("status") not in ["OK", "ZERO_RESULTS"]:
                            logger.warning(f"Places API status: {data.get('status')} - {data.get('error_message', '')}")
                            break
                        
                        for place in data.get("results", []):
                            pid = place.get("place_id", "")
                            lead_id = f"gm_{pid}"
                            if lead_id not in seen_ids:
                                seen_ids.add(lead_id)
                                leads.append({
                                    "place_id": lead_id,
                                    "naam": place.get("name", "Onbekend"),
                                    "source": "google",
                                    "adres": place.get("formatted_address", stad),
                                    "telefoonnummer": None,
                                    "google_maps_url": f"https://www.google.com/maps/place/?q=place_id:{pid}",
                                    "rating": place.get("rating"),
                                    "user_ratings_total": place.get("user_ratings_total", 0),
                                    "types": place.get("types", []),
                                    "open_now": place.get("opening_hours", {}).get("open_now"),
                                })
                        
                        next_token = data.get("next_page_token")
                        pages_fetched += 1
                        
                        if not next_token:
                            break
                    except Exception as e:
                        logger.error(f"Google Places API error for '{term}': {e}")
                        break
        
        return leads
    
    # ===== OpenStreetMap / Nominatim API (100% gratis) =====
    async def search_openstreetmap():
        leads = []
        async with aiohttp.ClientSession() as session:
            headers = {"User-Agent": "YrvanteLeadFinder/1.0 (info@yrvante.com)"}
            
            for term in search_terms[:3]:  # Top 3 synonyms
                try:
                    params = {
                        "q": f"{term}, {stad}, Nederland",
                        "format": "json",
                        "addressdetails": "1",
                        "limit": "20",
                        "countrycodes": "nl",
                    }
                    url = "https://nominatim.openstreetmap.org/search"
                    async with session.get(url, params=params, headers=headers, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                        results = await resp.json()
                    
                    for place in results:
                        osm_id = f"osm_{place.get('osm_id', '')}"
                        if osm_id not in seen_ids:
                            seen_ids.add(osm_id)
                            addr = place.get("address", {})
                            address_parts = [addr.get("road", ""), addr.get("house_number", ""), addr.get("city", addr.get("town", addr.get("village", stad)))]
                            address = " ".join(p for p in address_parts if p).strip() or place.get("display_name", stad)
                            
                            leads.append({
                                "place_id": osm_id,
                                "naam": place.get("name") or place.get("display_name", "").split(",")[0],
                                "source": "openstreetmap",
                                "adres": address,
                                "telefoonnummer": None,
                                "google_maps_url": f"https://www.openstreetmap.org/{place.get('osm_type', 'node')}/{place.get('osm_id', '')}",
                            })
                    
                    await asyncio.sleep(1.1)  # Nominatim rate limit: 1 req/sec
                except Exception as e:
                    logger.error(f"OSM Nominatim error for '{term}': {e}")
        
        return leads
    
    # Run all scrapers in parallel
    tasks = []
    
    if "google" in sources:
        tasks.append(("Google Maps", search_google_places()))
    if "openstreetmap" in sources:
        tasks.append(("OpenStreetMap", search_openstreetmap()))
    if "instagram" in sources:
        tasks.append(("Instagram", scrape_instagram()))
    if "facebook" in sources:
        tasks.append(("Facebook", scrape_facebook()))
    if "linkedin" in sources:
        tasks.append(("LinkedIn", scrape_linkedin()))
    if "telefoongids" in sources:
        tasks.append(("Telefoongids", scrape_telefoongids()))
    if "goudengids" in sources:
        tasks.append(("Gouden Gids", scrape_goudengids()))
    if "marktplaats" in sources:
        tasks.append(("Marktplaats", scrape_marktplaats()))
    if "kvk" in sources:
        tasks.append(("KVK", scrape_kvk()))
    
    # Execute all tasks with timeouts
    for source_name, task in tasks:
        try:
            leads = await asyncio.wait_for(task, timeout=30.0)
            all_leads.extend(leads)
            if leads:
                scraped_sources.append(f"{source_name} ({len(leads)})")
        except asyncio.TimeoutError:
            logger.warning(f"{source_name} scrape timed out")
            scraped_sources.append(f"{source_name} (timeout)")
        except Exception as e:
            logger.error(f"{source_name} scrape failed: {e}")
    
    return {
        "leads": all_leads,
        "totaal_gevonden": len(all_leads),
        "nextPageToken": None,
        "zoekgebied": stad,
        "bronnen_doorzocht": scraped_sources,
        "zoekterm": branche or "zzp freelancer diensten",
        "synoniemen_gezocht": used_synonyms,
        "aantal_zoektermen": len(search_terms),
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

# ========== Google Reviews API ==========

CACHE_DURATION = timedelta(hours=1)

@api_router.get("/reviews")
async def get_google_reviews():
    """Fetch Google Reviews with 1-hour cache."""
    now = datetime.now(timezone.utc)

    # Return cached data if fresh
    if _reviews_cache["data"] and _reviews_cache["fetched_at"]:
        if now - _reviews_cache["fetched_at"] < CACHE_DURATION:
            return _reviews_cache["data"]

    if not GOOGLE_PLACES_API_KEY or not GOOGLE_PLACE_ID:
        raise HTTPException(status_code=500, detail="Google Places not configured")

    url = (
        f"https://maps.googleapis.com/maps/api/place/details/json"
        f"?place_id={GOOGLE_PLACE_ID}"
        f"&fields=name,rating,user_ratings_total,reviews,url"
        f"&key={GOOGLE_PLACES_API_KEY}"
        f"&language=nl"
        f"&reviews_sort=newest"
    )

    try:
        async with httpx.AsyncClient(timeout=10) as client_http:
            resp = await client_http.get(url)
            data = resp.json()

        if data.get("status") != "OK":
            logger.error(f"Google Places API error: {data.get('status')}")
            raise HTTPException(status_code=502, detail="Google Places API error")

        result = data["result"]
        reviews = []
        for r in result.get("reviews", []):
            reviews.append({
                "author_name": r.get("author_name", ""),
                "profile_photo_url": r.get("profile_photo_url", ""),
                "rating": r.get("rating", 5),
                "text": r.get("text", ""),
                "relative_time_description": r.get("relative_time_description", ""),
                "time": r.get("time", 0),
            })

        response = {
            "name": result.get("name", "Yrvante"),
            "rating": result.get("rating", 5),
            "total_reviews": result.get("user_ratings_total", 0),
            "google_url": result.get("url", ""),
            "reviews": reviews,
        }

        _reviews_cache["data"] = response
        _reviews_cache["fetched_at"] = now
        return response

    except httpx.RequestError as e:
        logger.error(f"Google Places request failed: {e}")
        if _reviews_cache["data"]:
            return _reviews_cache["data"]
        raise HTTPException(status_code=502, detail="Could not fetch reviews")

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
