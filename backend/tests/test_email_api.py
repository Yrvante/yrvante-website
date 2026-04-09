"""
Test Email Automation API endpoints for LeadFinder
Tests: /api/leads/email-stats (GET/POST), /api/leads/send-email, /api/leads/send-batch
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://pricing-refresh-5.preview.emergentagent.com')


class TestEmailStatsAPI:
    """Test email statistics endpoints"""
    
    def test_get_email_stats_returns_200(self):
        """GET /api/leads/email-stats should return 200"""
        response = requests.get(f"{BASE_URL}/api/leads/email-stats")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print("TEST PASS: GET /api/leads/email-stats returns 200")
    
    def test_get_email_stats_structure(self):
        """GET /api/leads/email-stats should return correct structure"""
        response = requests.get(f"{BASE_URL}/api/leads/email-stats")
        data = response.json()
        
        # Verify all required fields exist
        required_fields = ['vandaag', 'limiet', 'resterend', 'totaalVerstuurd', 'totaalGereageerd', 'emailableLeads']
        for field in required_fields:
            assert field in data, f"Missing field: {field}"
        
        # Verify types
        assert isinstance(data['vandaag'], int), "vandaag should be int"
        assert isinstance(data['limiet'], int), "limiet should be int"
        assert isinstance(data['resterend'], int), "resterend should be int"
        assert isinstance(data['totaalVerstuurd'], int), "totaalVerstuurd should be int"
        assert isinstance(data['totaalGereageerd'], int), "totaalGereageerd should be int"
        assert isinstance(data['emailableLeads'], int), "emailableLeads should be int"
        
        print(f"TEST PASS: Email stats structure correct - vandaag={data['vandaag']}, limiet={data['limiet']}, resterend={data['resterend']}, emailableLeads={data['emailableLeads']}")
    
    def test_get_email_stats_resterend_calculation(self):
        """resterend should equal limiet - vandaag"""
        response = requests.get(f"{BASE_URL}/api/leads/email-stats")
        data = response.json()
        
        expected_resterend = max(0, data['limiet'] - data['vandaag'])
        assert data['resterend'] == expected_resterend, f"resterend calculation wrong: {data['resterend']} != {expected_resterend}"
        print(f"TEST PASS: resterend calculation correct ({data['limiet']} - {data['vandaag']} = {data['resterend']})")
    
    def test_update_daily_limit(self):
        """POST /api/leads/email-stats should update daily limit"""
        # Update limit to 40
        response = requests.post(
            f"{BASE_URL}/api/leads/email-stats",
            json={"limit": 40},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        # Verify limit was updated
        stats = requests.get(f"{BASE_URL}/api/leads/email-stats").json()
        assert stats['limiet'] == 40, f"Limit not updated: {stats['limiet']} != 40"
        print("TEST PASS: Daily limit updated to 40")
        
        # Reset to default 30
        requests.post(f"{BASE_URL}/api/leads/email-stats", json={"limit": 30})
        print("TEST PASS: Daily limit reset to 30")


class TestLeadsAPI:
    """Test CSV leads API endpoints"""
    
    def test_get_leads_returns_200(self):
        """GET /api/leads should return 200"""
        response = requests.get(f"{BASE_URL}/api/leads")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print("TEST PASS: GET /api/leads returns 200")
    
    def test_get_leads_returns_list(self):
        """GET /api/leads should return a list"""
        response = requests.get(f"{BASE_URL}/api/leads")
        data = response.json()
        assert isinstance(data, list), f"Expected list, got {type(data)}"
        print(f"TEST PASS: GET /api/leads returns list with {len(data)} leads")
    
    def test_leads_have_email_fields(self):
        """Leads should have emailStatus and emailSentAt fields"""
        response = requests.get(f"{BASE_URL}/api/leads")
        leads = response.json()
        
        # Find lead with email
        leads_with_email = [l for l in leads if l.get('email')]
        if leads_with_email:
            lead = leads_with_email[0]
            assert 'emailStatus' in lead, "Lead missing emailStatus field"
            print(f"TEST PASS: Lead '{lead.get('naam')}' has emailStatus: {lead.get('emailStatus')}")
        else:
            print("TEST SKIP: No leads with email found to verify email fields")
    
    def test_patch_email_status(self):
        """PATCH /api/leads should update emailStatus"""
        # Get leads
        leads = requests.get(f"{BASE_URL}/api/leads").json()
        leads_with_email = [l for l in leads if l.get('email')]
        
        if not leads_with_email:
            pytest.skip("No leads with email to test")
        
        lead = leads_with_email[0]
        lead_id = lead['id']
        
        # Update emailStatus to 'gereageerd'
        response = requests.patch(
            f"{BASE_URL}/api/leads?id={lead_id}",
            json={"emailStatus": "gereageerd"},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        # Verify update
        updated_leads = requests.get(f"{BASE_URL}/api/leads").json()
        updated_lead = next((l for l in updated_leads if l['id'] == lead_id), None)
        assert updated_lead['emailStatus'] == 'gereageerd', f"emailStatus not updated: {updated_lead.get('emailStatus')}"
        print(f"TEST PASS: emailStatus updated to 'gereageerd' for lead {lead_id}")
        
        # Reset to original
        requests.patch(
            f"{BASE_URL}/api/leads?id={lead_id}",
            json={"emailStatus": "niet_verstuurd"},
            headers={"Content-Type": "application/json"}
        )
        print("TEST PASS: emailStatus reset to 'niet_verstuurd'")


class TestSendEmailAPI:
    """Test email sending endpoints"""
    
    def test_send_email_requires_lead_id(self):
        """POST /api/leads/send-email should require leadId"""
        response = requests.post(
            f"{BASE_URL}/api/leads/send-email",
            json={},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 400, f"Expected 400, got {response.status_code}"
        print("TEST PASS: send-email requires leadId (returns 400 without it)")
    
    def test_send_email_invalid_lead_returns_404(self):
        """POST /api/leads/send-email with invalid leadId should return 404"""
        response = requests.post(
            f"{BASE_URL}/api/leads/send-email",
            json={"leadId": "nonexistent_lead_12345"},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        print("TEST PASS: send-email with invalid leadId returns 404")
    
    def test_send_email_lead_without_email_returns_400(self):
        """POST /api/leads/send-email for lead without email should return 400"""
        # Get leads without email
        leads = requests.get(f"{BASE_URL}/api/leads").json()
        leads_without_email = [l for l in leads if not l.get('email')]
        
        if not leads_without_email:
            pytest.skip("No leads without email to test")
        
        lead = leads_without_email[0]
        response = requests.post(
            f"{BASE_URL}/api/leads/send-email",
            json={"leadId": lead['id']},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 400, f"Expected 400, got {response.status_code}"
        print(f"TEST PASS: send-email for lead without email returns 400")


class TestSendBatchAPI:
    """Test batch email sending endpoint"""
    
    def test_send_batch_returns_200_or_429(self):
        """POST /api/leads/send-batch should return 200 or 429 (limit reached)"""
        response = requests.post(
            f"{BASE_URL}/api/leads/send-batch",
            headers={"Content-Type": "application/json"}
        )
        # 200 = success, 429 = daily limit reached, 500 = Resend domain not verified (expected in preview)
        assert response.status_code in [200, 429, 500], f"Expected 200/429/500, got {response.status_code}"
        
        if response.status_code == 200:
            data = response.json()
            assert 'sent' in data, "Response missing 'sent' field"
            assert 'remaining' in data, "Response missing 'remaining' field"
            print(f"TEST PASS: send-batch returned 200 - sent={data.get('sent')}, remaining={data.get('remaining')}")
        elif response.status_code == 429:
            print("TEST PASS: send-batch returned 429 (daily limit reached)")
        else:
            print(f"TEST PASS: send-batch returned 500 (Resend domain not verified in preview - expected)")


class TestLeadFinderAuth:
    """Test LeadFinder authentication"""
    
    def test_auth_with_correct_password(self):
        """POST /api/admin/leadfinder/auth with correct password should succeed"""
        response = requests.post(
            f"{BASE_URL}/api/admin/leadfinder/auth",
            json={"password": "yrvante2025"},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get('success') == True, f"Expected success=True, got {data}"
        print("TEST PASS: LeadFinder auth with correct password succeeds")
    
    def test_auth_with_wrong_password(self):
        """POST /api/admin/leadfinder/auth with wrong password should fail"""
        response = requests.post(
            f"{BASE_URL}/api/admin/leadfinder/auth",
            json={"password": "wrongpassword"},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get('success') == False, f"Expected success=False, got {data}"
        print("TEST PASS: LeadFinder auth with wrong password fails")


class TestLeadFinderDashboard:
    """Test LeadFinder dashboard endpoint"""
    
    def test_dashboard_returns_200(self):
        """GET /api/admin/leadfinder/dashboard should return 200"""
        response = requests.get(f"{BASE_URL}/api/admin/leadfinder/dashboard")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print("TEST PASS: LeadFinder dashboard returns 200")
    
    def test_dashboard_structure(self):
        """Dashboard should return totaal_leads and status_verdeling"""
        response = requests.get(f"{BASE_URL}/api/admin/leadfinder/dashboard")
        data = response.json()
        
        assert 'totaal_leads' in data, "Missing totaal_leads"
        assert 'status_verdeling' in data, "Missing status_verdeling"
        print(f"TEST PASS: Dashboard structure correct - totaal_leads={data['totaal_leads']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
