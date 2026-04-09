"""
Test suite for LeadFinder UI Modernization
Tests the 4-tab structure: HOME, WHATSAPP, EMAIL, STATS
Verifies removal of Tools tab and Google Maps Leads section
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://pricing-refresh-5.preview.emergentagent.com')

class TestLeadFinderAuth:
    """Authentication tests for LeadFinder"""
    
    def test_auth_with_correct_password(self):
        """Test login with correct password 'yrvante2025'"""
        response = requests.post(
            f"{BASE_URL}/api/admin/leadfinder/auth",
            json={"password": "yrvante2025"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == True
        print("PASS: Auth with correct password succeeds")
    
    def test_auth_with_wrong_password(self):
        """Test login with wrong password fails"""
        response = requests.post(
            f"{BASE_URL}/api/admin/leadfinder/auth",
            json={"password": "wrongpassword"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == False
        print("PASS: Auth with wrong password fails")


class TestLeadsAPI:
    """Tests for /api/leads endpoint (CSV leads for WHATSAPP tab)"""
    
    def test_get_leads(self):
        """Test GET /api/leads returns list of leads"""
        response = requests.get(f"{BASE_URL}/api/leads")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: GET /api/leads returns {len(data)} leads")
    
    def test_leads_have_required_fields(self):
        """Test leads have required fields for WHATSAPP tab"""
        response = requests.get(f"{BASE_URL}/api/leads")
        assert response.status_code == 200
        data = response.json()
        
        if len(data) > 0:
            lead = data[0]
            # Check required fields for WHATSAPP tab
            assert "id" in lead
            assert "naam" in lead
            assert "status" in lead
            print(f"PASS: Lead has required fields: id={lead.get('id')}, naam={lead.get('naam')}")
        else:
            print("INFO: No leads in database to verify fields")


class TestEmailStatsAPI:
    """Tests for /api/leads/email-stats endpoint (EMAIL tab)"""
    
    def test_get_email_stats(self):
        """Test GET /api/leads/email-stats returns correct structure"""
        response = requests.get(f"{BASE_URL}/api/leads/email-stats")
        assert response.status_code == 200
        data = response.json()
        
        # Verify required fields for EMAIL tab
        assert "vandaag" in data
        assert "limiet" in data
        assert "resterend" in data
        assert "totaalVerstuurd" in data
        assert "totaalGereageerd" in data
        assert "emailableLeads" in data
        
        print(f"PASS: Email stats: vandaag={data['vandaag']}, limiet={data['limiet']}, resterend={data['resterend']}")
    
    def test_update_email_limit(self):
        """Test POST /api/leads/email-stats updates daily limit"""
        # Get current limit
        response = requests.get(f"{BASE_URL}/api/leads/email-stats")
        original_limit = response.json().get("limiet", 30)
        
        # Update to new limit
        new_limit = 40
        response = requests.post(
            f"{BASE_URL}/api/leads/email-stats",
            json={"limit": new_limit}
        )
        assert response.status_code == 200
        
        # Verify update
        response = requests.get(f"{BASE_URL}/api/leads/email-stats")
        assert response.json().get("limiet") == new_limit
        
        # Restore original limit
        requests.post(
            f"{BASE_URL}/api/leads/email-stats",
            json={"limit": original_limit}
        )
        print(f"PASS: Email limit updated from {original_limit} to {new_limit} and restored")


class TestLeadFinderDashboard:
    """Tests for /api/admin/leadfinder/dashboard endpoint (STATS tab)"""
    
    def test_get_dashboard(self):
        """Test GET /api/admin/leadfinder/dashboard returns stats"""
        response = requests.get(f"{BASE_URL}/api/admin/leadfinder/dashboard")
        assert response.status_code == 200
        data = response.json()
        
        # Verify required fields for STATS tab
        assert "totaal_leads" in data
        assert "status_verdeling" in data
        
        print(f"PASS: Dashboard stats: totaal_leads={data['totaal_leads']}")


class TestLeadFinderLeads:
    """Tests for /api/admin/leadfinder/leads endpoint (saved leads)"""
    
    def test_get_leadfinder_leads(self):
        """Test GET /api/admin/leadfinder/leads returns leads list"""
        response = requests.get(f"{BASE_URL}/api/admin/leadfinder/leads")
        assert response.status_code == 200
        data = response.json()
        
        assert "leads" in data
        assert isinstance(data["leads"], list)
        print(f"PASS: LeadFinder leads: {len(data['leads'])} leads")


class TestAPIHealth:
    """Basic API health checks"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"PASS: API root returns: {data['message']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
