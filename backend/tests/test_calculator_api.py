"""
Backend API tests for Yrvante Calculator and Contact endpoints
Tests: /api/contact endpoint for quote submissions
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestContactAPI:
    """Contact/Quote submission endpoint tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Yrvante API"
        print(f"PASS: API root returns: {data}")
    
    def test_contact_submission_success(self):
        """Test successful contact/quote submission"""
        payload = {
            "name": "TEST_Calculator User",
            "email": "test_calculator@example.com",
            "phone": "+31612345678",
            "message": "📦 PAKKET: Pro Pakket - €900\n\n💰 TOTAAL EENMALIG: €900\n\n📝 BERICHT:\nTest quote submission from calculator"
        }
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "message" in data
        print(f"PASS: Contact submission successful: {data}")
    
    def test_contact_submission_with_addons(self):
        """Test contact submission with add-ons in message"""
        payload = {
            "name": "TEST_Addon User",
            "email": "test_addons@example.com",
            "phone": "",
            "message": """📦 PAKKET: Basis Pakket - €500

➕ EXTRA'S:
• Extra pagina's (x3) - €150
• Meertalige website - €200
• Onderhoud abonnement - €25/maand

💰 TOTAAL EENMALIG: €850
💳 MAANDELIJKS: €25/maand

📝 BERICHT:
Test with multiple add-ons"""
        }
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"PASS: Contact with add-ons successful: {data}")
    
    def test_contact_submission_minimal(self):
        """Test contact submission with minimal required fields"""
        payload = {
            "name": "TEST_Minimal",
            "email": "minimal@example.com",
            "message": "Minimal test message"
        }
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"PASS: Minimal contact submission successful: {data}")
    
    def test_contact_submission_invalid_email(self):
        """Test contact submission with invalid email"""
        payload = {
            "name": "TEST_Invalid",
            "email": "not-an-email",
            "message": "Test message"
        }
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Should return 422 for validation error
        assert response.status_code == 422
        print(f"PASS: Invalid email rejected with status 422")
    
    def test_contact_submission_missing_required(self):
        """Test contact submission with missing required fields"""
        payload = {
            "name": "TEST_Missing"
            # Missing email and message
        }
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Should return 422 for validation error
        assert response.status_code == 422
        print(f"PASS: Missing fields rejected with status 422")


class TestAdminAPI:
    """Admin endpoint tests"""
    
    def test_admin_login_success(self):
        """Test admin login with correct password"""
        payload = {"password": "yrvante2025"}
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"PASS: Admin login successful: {data}")
    
    def test_admin_login_failure(self):
        """Test admin login with wrong password"""
        payload = {"password": "wrongpassword"}
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 401
        print(f"PASS: Wrong password rejected with status 401")
    
    def test_admin_stats(self):
        """Test admin stats endpoint"""
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        
        assert response.status_code == 200
        data = response.json()
        assert "total_page_views" in data
        assert "total_contacts" in data
        assert "unique_visitors" in data
        print(f"PASS: Admin stats returned: {data}")


class TestAnalyticsAPI:
    """Analytics endpoint tests"""
    
    def test_pageview_tracking(self):
        """Test page view tracking"""
        payload = {
            "page": "/calculator",
            "visitor_id": "test_visitor_123",
            "referrer": "https://google.com"
        }
        response = requests.post(
            f"{BASE_URL}/api/analytics/pageview",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"PASS: Pageview tracked: {data}")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
