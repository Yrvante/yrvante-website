"""
Test suite for /api/leads endpoints (CSV Leads CRUD)
Tests the new consolidated leads API that replaces /api/admin/csv-leads
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://pricing-refresh-5.preview.emergentagent.com').rstrip('/')

class TestLeadsAPI:
    """Test /api/leads CRUD operations"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup test data prefix for cleanup"""
        self.test_prefix = f"TEST_{int(time.time())}"
        yield
        # Cleanup: Delete test leads after each test class
        try:
            # Get all leads and delete test ones
            response = requests.get(f"{BASE_URL}/api/leads")
            if response.status_code == 200:
                leads = response.json()
                for lead in leads:
                    if lead.get('naam', '').startswith('TEST_'):
                        requests.delete(f"{BASE_URL}/api/leads?id={lead.get('id')}")
        except:
            pass
    
    def test_get_leads_returns_list(self):
        """GET /api/leads should return a list"""
        response = requests.get(f"{BASE_URL}/api/leads")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        print(f"PASS: GET /api/leads returns list with {len(data)} leads")
    
    def test_post_leads_bulk_insert(self):
        """POST /api/leads with {leads: [...]} should bulk insert leads"""
        test_leads = [
            {
                "naam": f"TEST_Bedrijf_A_{int(time.time())}",
                "categorie": "Kapper",
                "plaats": "Amsterdam",
                "telefoon": f"06{int(time.time()) % 100000000:08d}",
                "website": "",
                "rating": "4.5",
                "reviews": "25",
                "status": "nieuw"
            },
            {
                "naam": f"TEST_Bedrijf_B_{int(time.time())}",
                "categorie": "Bakker",
                "plaats": "Rotterdam",
                "telefoon": f"06{(int(time.time()) + 1) % 100000000:08d}",
                "website": "https://example.com",
                "rating": "4.8",
                "reviews": "100",
                "status": "nieuw"
            }
        ]
        
        response = requests.post(
            f"{BASE_URL}/api/leads",
            json={"leads": test_leads},
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("success") == True, "Response should have success: true"
        assert "total" in data, "Response should have total count"
        assert "inserted" in data, "Response should have inserted count"
        print(f"PASS: POST /api/leads bulk insert - inserted {data.get('inserted')} leads, total: {data.get('total')}")
    
    def test_post_leads_deduplication_by_phone(self):
        """POST /api/leads should deduplicate by phone number"""
        unique_phone = f"06{int(time.time()) % 100000000:08d}"
        
        # First insert
        test_lead = {
            "naam": f"TEST_Dedup_First_{int(time.time())}",
            "telefoon": unique_phone,
            "status": "nieuw"
        }
        response1 = requests.post(
            f"{BASE_URL}/api/leads",
            json={"leads": [test_lead]},
            headers={"Content-Type": "application/json"}
        )
        assert response1.status_code == 200
        data1 = response1.json()
        first_inserted = data1.get("inserted", 0)
        
        # Second insert with same phone
        test_lead2 = {
            "naam": f"TEST_Dedup_Second_{int(time.time())}",
            "telefoon": unique_phone,  # Same phone
            "status": "nieuw"
        }
        response2 = requests.post(
            f"{BASE_URL}/api/leads",
            json={"leads": [test_lead2]},
            headers={"Content-Type": "application/json"}
        )
        assert response2.status_code == 200
        data2 = response2.json()
        second_inserted = data2.get("inserted", 0)
        
        # Second insert should not add duplicate
        assert second_inserted == 0, f"Expected 0 inserted (duplicate phone), got {second_inserted}"
        print(f"PASS: POST /api/leads deduplication - first insert: {first_inserted}, second insert: {second_inserted}")
    
    def test_patch_lead_update_status(self):
        """PATCH /api/leads?id=xxx should update lead status"""
        # First create a lead
        unique_phone = f"06{int(time.time()) % 100000000:08d}"
        test_lead = {
            "id": f"test_patch_{int(time.time())}",
            "naam": f"TEST_Patch_Status_{int(time.time())}",
            "telefoon": unique_phone,
            "status": "nieuw"
        }
        create_response = requests.post(
            f"{BASE_URL}/api/leads",
            json={"leads": [test_lead]},
            headers={"Content-Type": "application/json"}
        )
        assert create_response.status_code == 200
        
        # Update status
        lead_id = test_lead["id"]
        patch_response = requests.patch(
            f"{BASE_URL}/api/leads?id={lead_id}",
            json={"status": "benaderd"},
            headers={"Content-Type": "application/json"}
        )
        
        assert patch_response.status_code == 200, f"Expected 200, got {patch_response.status_code}: {patch_response.text}"
        data = patch_response.json()
        assert data.get("success") == True, "Response should have success: true"
        print(f"PASS: PATCH /api/leads?id={lead_id} status update to 'benaderd'")
    
    def test_patch_lead_update_notitie(self):
        """PATCH /api/leads?id=xxx should update lead notitie"""
        # First create a lead
        unique_phone = f"06{int(time.time()) % 100000000:08d}"
        test_lead = {
            "id": f"test_note_{int(time.time())}",
            "naam": f"TEST_Patch_Note_{int(time.time())}",
            "telefoon": unique_phone,
            "status": "nieuw"
        }
        create_response = requests.post(
            f"{BASE_URL}/api/leads",
            json={"leads": [test_lead]},
            headers={"Content-Type": "application/json"}
        )
        assert create_response.status_code == 200
        
        # Update notitie
        lead_id = test_lead["id"]
        test_note = "Test notitie - gebeld op maandag"
        patch_response = requests.patch(
            f"{BASE_URL}/api/leads?id={lead_id}",
            json={"notitie": test_note},
            headers={"Content-Type": "application/json"}
        )
        
        assert patch_response.status_code == 200, f"Expected 200, got {patch_response.status_code}: {patch_response.text}"
        data = patch_response.json()
        assert data.get("success") == True, "Response should have success: true"
        print(f"PASS: PATCH /api/leads?id={lead_id} notitie update")
    
    def test_patch_lead_without_id_returns_400(self):
        """PATCH /api/leads without id should return 400"""
        response = requests.patch(
            f"{BASE_URL}/api/leads",
            json={"status": "benaderd"},
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 400, f"Expected 400, got {response.status_code}"
        print("PASS: PATCH /api/leads without id returns 400")
    
    def test_delete_single_lead(self):
        """DELETE /api/leads?id=xxx should delete a single lead"""
        # First create a lead
        unique_phone = f"06{int(time.time()) % 100000000:08d}"
        test_lead = {
            "id": f"test_delete_{int(time.time())}",
            "naam": f"TEST_Delete_Single_{int(time.time())}",
            "telefoon": unique_phone,
            "status": "nieuw"
        }
        create_response = requests.post(
            f"{BASE_URL}/api/leads",
            json={"leads": [test_lead]},
            headers={"Content-Type": "application/json"}
        )
        assert create_response.status_code == 200
        
        # Delete the lead
        lead_id = test_lead["id"]
        delete_response = requests.delete(f"{BASE_URL}/api/leads?id={lead_id}")
        
        assert delete_response.status_code == 200, f"Expected 200, got {delete_response.status_code}: {delete_response.text}"
        data = delete_response.json()
        assert data.get("success") == True, "Response should have success: true"
        print(f"PASS: DELETE /api/leads?id={lead_id} deleted single lead")
    
    def test_all_status_options_accepted(self):
        """PATCH /api/leads should accept all 5 status options"""
        status_options = ['nieuw', 'benaderd', 'gereageerd', 'geen_interesse', 'overgeslagen']
        
        # Create a lead for testing
        unique_phone = f"06{int(time.time()) % 100000000:08d}"
        test_lead = {
            "id": f"test_status_all_{int(time.time())}",
            "naam": f"TEST_All_Status_{int(time.time())}",
            "telefoon": unique_phone,
            "status": "nieuw"
        }
        create_response = requests.post(
            f"{BASE_URL}/api/leads",
            json={"leads": [test_lead]},
            headers={"Content-Type": "application/json"}
        )
        assert create_response.status_code == 200
        
        lead_id = test_lead["id"]
        
        for status in status_options:
            patch_response = requests.patch(
                f"{BASE_URL}/api/leads?id={lead_id}",
                json={"status": status},
                headers={"Content-Type": "application/json"}
            )
            assert patch_response.status_code == 200, f"Status '{status}' should be accepted, got {patch_response.status_code}"
        
        print(f"PASS: All 5 status options accepted: {status_options}")
    
    def test_get_leads_returns_new_field_names(self):
        """GET /api/leads should return leads with new field names (plaats, reviews)"""
        # Create a lead with new field names
        unique_phone = f"06{int(time.time()) % 100000000:08d}"
        test_lead = {
            "id": f"test_fields_{int(time.time())}",
            "naam": f"TEST_Fields_{int(time.time())}",
            "categorie": "Test Category",
            "plaats": "Utrecht",  # New field name (was 'adres')
            "telefoon": unique_phone,
            "website": "https://test.com",
            "rating": "4.5",
            "reviews": "50",  # New field name (was 'aantalReviews')
            "status": "nieuw",
            "notitie": "Test note"
        }
        
        create_response = requests.post(
            f"{BASE_URL}/api/leads",
            json={"leads": [test_lead]},
            headers={"Content-Type": "application/json"}
        )
        assert create_response.status_code == 200
        
        # Get leads and verify field names
        get_response = requests.get(f"{BASE_URL}/api/leads")
        assert get_response.status_code == 200
        leads = get_response.json()
        
        # Find our test lead
        test_lead_found = None
        for lead in leads:
            if lead.get("id") == test_lead["id"]:
                test_lead_found = lead
                break
        
        assert test_lead_found is not None, "Test lead should be found"
        assert "plaats" in test_lead_found, "Lead should have 'plaats' field"
        assert "reviews" in test_lead_found, "Lead should have 'reviews' field"
        assert test_lead_found.get("plaats") == "Utrecht", f"plaats should be 'Utrecht', got {test_lead_found.get('plaats')}"
        assert test_lead_found.get("reviews") == "50", f"reviews should be '50', got {test_lead_found.get('reviews')}"
        
        print("PASS: GET /api/leads returns leads with new field names (plaats, reviews)")


class TestLegacyEndpointsRedirect:
    """Test that old /api/admin/csv-leads endpoints still work (backward compatibility)"""
    
    def test_legacy_get_csv_leads(self):
        """GET /api/admin/csv-leads should still work"""
        response = requests.get(f"{BASE_URL}/api/admin/csv-leads")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        print(f"PASS: Legacy GET /api/admin/csv-leads returns list with {len(data)} leads")
    
    def test_legacy_post_csv_leads(self):
        """POST /api/admin/csv-leads should still work"""
        test_lead = {
            "id": f"legacy_test_{int(time.time())}",
            "naam": f"TEST_Legacy_{int(time.time())}",
            "telefoon": f"06{int(time.time()) % 100000000:08d}",
            "status": "nieuw"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/admin/csv-leads",
            json={"leads": [test_lead]},
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("success") == True, "Response should have success: true"
        print("PASS: Legacy POST /api/admin/csv-leads works")


class TestAdminLogin:
    """Test admin authentication"""
    
    def test_admin_login_success(self):
        """POST /api/admin/login with correct password should succeed"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "yrvante2025"},
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get("success") == True, "Login should succeed"
        print("PASS: Admin login with correct password succeeds")
    
    def test_admin_login_failure(self):
        """POST /api/admin/login with wrong password should fail"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrongpassword"},
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("PASS: Admin login with wrong password returns 401")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
