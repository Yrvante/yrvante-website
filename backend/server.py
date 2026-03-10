from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
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
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False
    read: bool = False

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
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
            message=input.message
        )
        
        doc = submission_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        email_sent = False
        if resend.api_key:
            try:
                html_content = f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #000000; border-bottom: 2px solid #000;">Nieuw Website Aanvraag - Yrvante</h2>
                    <div style="padding: 20px 0;">
                        <p><strong>Naam:</strong> {input.name}</p>
                        <p><strong>Email:</strong> {input.email}</p>
                        <p><strong>Bericht:</strong></p>
                        <div style="background-color: #f8f8f8; padding: 15px; border-left: 3px solid #000;">
                            {input.message}
                        </div>
                    </div>
                    <hr style="border: none; border-top: 1px solid #e5e5e5;">
                    <p style="color: #666; font-size: 12px;">Dit bericht werd verzonden via het contactformulier op yrvante.com</p>
                </div>
                """
                
                params = {
                    "from": SENDER_EMAIL,
                    "to": [RECIPIENT_EMAIL],
                    "subject": f"Nieuwe aanvraag van {input.name} - Yrvante",
                    "html": html_content
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
