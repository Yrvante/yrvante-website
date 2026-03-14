"""
Backend API Tests for Yrvante Website
Tests: Contact form, Admin endpoints, Status checks, Analytics
"""

import pytest
import requests
import os
import uuid
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestHealthAndRoot:
    """Test basic API health and root endpoint"""
    
    def test_api_root_returns_200(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Yrvante API"
        print("✓ API root endpoint working")


class TestContactForm:
    """Test contact form submission with phone field and validation"""
    
    def test_contact_submission_success(self):
        """Test successful contact form submission with all fields including phone"""
        payload = {
            "name": "TEST_Contact User",
            "email": "test@example.com",
            "phone": "06 12345678",
            "message": "This is a test message for Yrvante website contact form."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data["success"] == True
        assert "message" in data
        print("✓ Contact form submission with phone field works")
    
    def test_contact_submission_without_phone(self):
        """Test contact form submission without optional phone field"""
        payload = {
            "name": "TEST_No Phone User",
            "email": "nophone@example.com",
            "message": "Testing contact form without phone number."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print("✓ Contact form submission without phone works")
    
    def test_contact_submission_invalid_email(self):
        """Test contact form rejects invalid email"""
        payload = {
            "name": "TEST_Invalid Email",
            "email": "not-an-email",
            "message": "This should fail"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422, f"Expected 422 for invalid email, got {response.status_code}"
        print("✓ Contact form correctly rejects invalid email")
    
    def test_contact_submission_missing_required_fields(self):
        """Test contact form requires name, email, message"""
        # Missing name
        payload = {"email": "test@example.com", "message": "test"}
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
        
        # Missing email
        payload = {"name": "Test", "message": "test"}
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
        
        # Missing message
        payload = {"name": "Test", "email": "test@example.com"}
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
        print("✓ Contact form correctly validates required fields")


class TestStatusEndpoints:
    """Test status check endpoints"""
    
    def test_create_status_check(self):
        """Test creating a status check"""
        payload = {"client_name": "TEST_Status_Client"}
        response = requests.post(f"{BASE_URL}/api/status", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["client_name"] == "TEST_Status_Client"
        print("✓ Status check creation works")
    
    def test_get_status_checks(self):
        """Test retrieving status checks"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print("✓ Status checks retrieval works")


class TestAnalytics:
    """Test analytics pageview tracking"""
    
    def test_track_pageview(self):
        """Test tracking a pageview"""
        payload = {
            "page": "/test-page",
            "visitor_id": str(uuid.uuid4()),
            "referrer": "https://google.com"
        }
        response = requests.post(f"{BASE_URL}/api/analytics/pageview", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print("✓ Analytics pageview tracking works")
    
    def test_track_pageview_minimal(self):
        """Test tracking pageview with minimal data"""
        payload = {
            "page": "/",
            "visitor_id": str(uuid.uuid4())
        }
        response = requests.post(f"{BASE_URL}/api/analytics/pageview", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print("✓ Analytics pageview minimal data works")


class TestAdminEndpoints:
    """Test admin authentication and dashboard endpoints"""
    
    def test_admin_login_success(self):
        """Test admin login with correct password"""
        payload = {"password": "yrvante2025"}
        response = requests.post(f"{BASE_URL}/api/admin/login", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "token" in data
        print("✓ Admin login with correct password works")
    
    def test_admin_login_failure(self):
        """Test admin login with incorrect password"""
        payload = {"password": "wrongpassword"}
        response = requests.post(f"{BASE_URL}/api/admin/login", json=payload)
        assert response.status_code == 401
        print("✓ Admin login correctly rejects wrong password")
    
    def test_admin_stats(self):
        """Test admin stats endpoint"""
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code == 200
        data = response.json()
        assert "total_page_views" in data
        assert "unique_visitors" in data
        assert "total_contacts" in data
        assert "unread_contacts" in data
        assert "page_views_today" in data
        assert "page_views_week" in data
        print("✓ Admin stats endpoint works")
    
    def test_admin_contacts_list(self):
        """Test admin contacts list endpoint"""
        response = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print("✓ Admin contacts list works")
    
    def test_admin_pageviews(self):
        """Test admin pageviews endpoint"""
        response = requests.get(f"{BASE_URL}/api/admin/pageviews")
        assert response.status_code == 200
        data = response.json()
        assert "daily_views" in data
        assert "page_breakdown" in data
        assert "total" in data
        print("✓ Admin pageviews endpoint works")


class TestContactManagement:
    """Test contact CRUD operations"""
    
    def test_create_and_mark_contact_read(self):
        """Test creating contact and marking it as read"""
        # First create a contact
        contact_payload = {
            "name": "TEST_Read_Contact",
            "email": "read_test@example.com",
            "phone": "06 98765432",
            "message": "Test message for mark as read functionality"
        }
        create_response = requests.post(f"{BASE_URL}/api/contact", json=contact_payload)
        assert create_response.status_code == 200
        
        # Get all contacts to find our test contact
        contacts_response = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert contacts_response.status_code == 200
        contacts = contacts_response.json()
        
        # Find our test contact
        test_contact = None
        for contact in contacts:
            if contact.get("email") == "read_test@example.com":
                test_contact = contact
                break
        
        if test_contact:
            # Mark as read
            contact_id = test_contact["id"]
            read_response = requests.put(f"{BASE_URL}/api/admin/contacts/{contact_id}/read")
            assert read_response.status_code == 200
            data = read_response.json()
            assert data["success"] == True
            print("✓ Contact mark as read works")
        else:
            print("⚠ Could not find test contact to mark as read")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
