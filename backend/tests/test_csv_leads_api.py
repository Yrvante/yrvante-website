"""
Test CSV Leads API Endpoints
Tests for MongoDB-synced CSV leads feature:
- GET /api/admin/csv-leads - Retrieve all CSV leads
- POST /api/admin/csv-leads - Bulk save CSV leads
- PUT /api/admin/csv-leads/{id}/status - Update lead status
- DELETE /api/admin/csv-leads/{id} - Delete single lead
- DELETE /api/admin/csv-leads - Clear all leads
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://pricing-refresh-5.preview.emergentagent.com')

class TestCsvLeadsAPI:
    """CSV Leads API endpoint tests - MongoDB sync feature"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Clear CSV leads before each test"""
        requests.delete(f"{BASE_URL}/api/admin/csv-leads")
        yield
        # Cleanup after test
        requests.delete(f"{BASE_URL}/api/admin/csv-leads")
    
    def test_get_csv_leads_empty(self):
        """GET /api/admin/csv-leads returns empty array when no leads"""
        response = requests.get(f"{BASE_URL}/api/admin/csv-leads")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        assert len(data) == 0, "Should be empty after clear"
        print("PASS: GET csv-leads returns empty array")
    
    def test_post_csv_leads_bulk_save(self):
        """POST /api/admin/csv-leads saves leads to MongoDB"""
        test_leads = [
            {
                "id": f"test_{uuid.uuid4().hex[:8]}",
                "naam": "TestBedrijf A",
                "categorie": "Kapper",
                "adres": "Straat 1 Amsterdam",
                "telefoon": "0612345678",
                "website": "",
                "rating": "5.0",
                "aantalReviews": "42",
                "status": "nieuw"
            },
            {
                "id": f"test_{uuid.uuid4().hex[:8]}",
                "naam": "TestBedrijf B",
                "categorie": "Salon",
                "adres": "Weg 2 Rotterdam",
                "telefoon": "0687654321",
                "website": "www.test.nl",
                "rating": "4.3",
                "aantalReviews": "18",
                "status": "nieuw"
            }
        ]
        
        # POST leads
        response = requests.post(
            f"{BASE_URL}/api/admin/csv-leads",
            json={"leads": test_leads}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get("success") == True, "Should return success: true"
        assert data.get("total") == 2, f"Should have 2 leads, got {data.get('total')}"
        print("PASS: POST csv-leads saves leads to MongoDB")
        
        # Verify persistence with GET
        get_response = requests.get(f"{BASE_URL}/api/admin/csv-leads")
        assert get_response.status_code == 200
        leads = get_response.json()
        assert len(leads) == 2, f"Should have 2 leads persisted, got {len(leads)}"
        
        # Verify lead data
        lead_names = [l["naam"] for l in leads]
        assert "TestBedrijf A" in lead_names, "TestBedrijf A should be in leads"
        assert "TestBedrijf B" in lead_names, "TestBedrijf B should be in leads"
        print("PASS: Leads persisted correctly in MongoDB")
    
    def test_put_csv_lead_status_update(self):
        """PUT /api/admin/csv-leads/{id}/status updates lead status"""
        # First create a lead
        test_id = f"test_{uuid.uuid4().hex[:8]}"
        test_lead = {
            "id": test_id,
            "naam": "Status Test Lead",
            "categorie": "Test",
            "adres": "Test Address",
            "telefoon": "0600000000",
            "website": "",
            "rating": "",
            "aantalReviews": "",
            "status": "nieuw"
        }
        requests.post(f"{BASE_URL}/api/admin/csv-leads", json={"leads": [test_lead]})
        
        # Update status to 'benaderd'
        response = requests.put(
            f"{BASE_URL}/api/admin/csv-leads/{test_id}/status",
            json={"status": "benaderd"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get("success") == True, "Should return success: true"
        print("PASS: PUT status update returns success")
        
        # Verify status persisted
        get_response = requests.get(f"{BASE_URL}/api/admin/csv-leads")
        leads = get_response.json()
        lead = next((l for l in leads if l["id"] == test_id), None)
        assert lead is not None, "Lead should exist"
        assert lead["status"] == "benaderd", f"Status should be 'benaderd', got '{lead['status']}'"
        print("PASS: Status 'benaderd' persisted in MongoDB")
    
    def test_put_csv_lead_status_geen_interesse(self):
        """PUT /api/admin/csv-leads/{id}/status with 'geen_interesse' status"""
        # Create a lead
        test_id = f"test_{uuid.uuid4().hex[:8]}"
        test_lead = {
            "id": test_id,
            "naam": "Geen Interesse Test",
            "categorie": "Test",
            "adres": "Test Address",
            "telefoon": "0600000001",
            "website": "",
            "rating": "",
            "aantalReviews": "",
            "status": "nieuw"
        }
        requests.post(f"{BASE_URL}/api/admin/csv-leads", json={"leads": [test_lead]})
        
        # Update status to 'geen_interesse'
        response = requests.put(
            f"{BASE_URL}/api/admin/csv-leads/{test_id}/status",
            json={"status": "geen_interesse"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print("PASS: PUT status 'geen_interesse' accepted")
        
        # Verify status persisted
        get_response = requests.get(f"{BASE_URL}/api/admin/csv-leads")
        leads = get_response.json()
        lead = next((l for l in leads if l["id"] == test_id), None)
        assert lead is not None, "Lead should exist"
        assert lead["status"] == "geen_interesse", f"Status should be 'geen_interesse', got '{lead['status']}'"
        print("PASS: Status 'geen_interesse' persisted in MongoDB")
    
    def test_delete_single_csv_lead(self):
        """DELETE /api/admin/csv-leads/{id} removes single lead"""
        # Create leads
        test_id_1 = f"test_{uuid.uuid4().hex[:8]}"
        test_id_2 = f"test_{uuid.uuid4().hex[:8]}"
        test_leads = [
            {"id": test_id_1, "naam": "Lead To Delete", "categorie": "", "adres": "", "telefoon": "", "website": "", "rating": "", "aantalReviews": "", "status": "nieuw"},
            {"id": test_id_2, "naam": "Lead To Keep", "categorie": "", "adres": "", "telefoon": "", "website": "", "rating": "", "aantalReviews": "", "status": "nieuw"}
        ]
        requests.post(f"{BASE_URL}/api/admin/csv-leads", json={"leads": test_leads})
        
        # Delete first lead
        response = requests.delete(f"{BASE_URL}/api/admin/csv-leads/{test_id_1}")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get("success") == True, "Should return success: true"
        print("PASS: DELETE single lead returns success")
        
        # Verify deletion
        get_response = requests.get(f"{BASE_URL}/api/admin/csv-leads")
        leads = get_response.json()
        lead_ids = [l["id"] for l in leads]
        assert test_id_1 not in lead_ids, "Deleted lead should not exist"
        assert test_id_2 in lead_ids, "Other lead should still exist"
        print("PASS: Single lead deleted, other lead preserved")
    
    def test_delete_all_csv_leads(self):
        """DELETE /api/admin/csv-leads clears all leads"""
        # Create some leads
        test_leads = [
            {"id": f"test_{uuid.uuid4().hex[:8]}", "naam": "Lead 1", "categorie": "", "adres": "", "telefoon": "", "website": "", "rating": "", "aantalReviews": "", "status": "nieuw"},
            {"id": f"test_{uuid.uuid4().hex[:8]}", "naam": "Lead 2", "categorie": "", "adres": "", "telefoon": "", "website": "", "rating": "", "aantalReviews": "", "status": "nieuw"},
            {"id": f"test_{uuid.uuid4().hex[:8]}", "naam": "Lead 3", "categorie": "", "adres": "", "telefoon": "", "website": "", "rating": "", "aantalReviews": "", "status": "nieuw"}
        ]
        requests.post(f"{BASE_URL}/api/admin/csv-leads", json={"leads": test_leads})
        
        # Verify leads exist
        get_response = requests.get(f"{BASE_URL}/api/admin/csv-leads")
        assert len(get_response.json()) == 3, "Should have 3 leads"
        
        # Clear all
        response = requests.delete(f"{BASE_URL}/api/admin/csv-leads")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get("success") == True, "Should return success: true"
        print("PASS: DELETE all leads returns success")
        
        # Verify all cleared
        get_response = requests.get(f"{BASE_URL}/api/admin/csv-leads")
        leads = get_response.json()
        assert len(leads) == 0, f"Should have 0 leads after clear, got {len(leads)}"
        print("PASS: All leads cleared from MongoDB")
    
    def test_put_status_nonexistent_lead_returns_404(self):
        """PUT /api/admin/csv-leads/{id}/status returns 404 for nonexistent lead"""
        response = requests.put(
            f"{BASE_URL}/api/admin/csv-leads/nonexistent_id_12345/status",
            json={"status": "benaderd"}
        )
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        print("PASS: PUT status on nonexistent lead returns 404")
    
    def test_delete_nonexistent_lead_returns_404(self):
        """DELETE /api/admin/csv-leads/{id} returns 404 for nonexistent lead"""
        response = requests.delete(f"{BASE_URL}/api/admin/csv-leads/nonexistent_id_12345")
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        print("PASS: DELETE nonexistent lead returns 404")
    
    def test_all_status_options_accepted(self):
        """Verify all 5 status options are accepted by API"""
        status_options = ['nieuw', 'benaderd', 'gereageerd', 'geen_interesse', 'overgeslagen']
        
        for status in status_options:
            test_id = f"test_{uuid.uuid4().hex[:8]}"
            test_lead = {
                "id": test_id,
                "naam": f"Status Test {status}",
                "categorie": "",
                "adres": "",
                "telefoon": "",
                "website": "",
                "rating": "",
                "aantalReviews": "",
                "status": "nieuw"
            }
            requests.post(f"{BASE_URL}/api/admin/csv-leads", json={"leads": [test_lead]})
            
            response = requests.put(
                f"{BASE_URL}/api/admin/csv-leads/{test_id}/status",
                json={"status": status}
            )
            assert response.status_code == 200, f"Status '{status}' should be accepted, got {response.status_code}"
            
            # Verify persisted
            get_response = requests.get(f"{BASE_URL}/api/admin/csv-leads")
            leads = get_response.json()
            lead = next((l for l in leads if l["id"] == test_id), None)
            assert lead["status"] == status, f"Status should be '{status}', got '{lead['status']}'"
            
            # Cleanup
            requests.delete(f"{BASE_URL}/api/admin/csv-leads/{test_id}")
        
        print(f"PASS: All 5 status options accepted: {status_options}")


class TestAdminLogin:
    """Admin login endpoint tests"""
    
    def test_admin_login_success(self):
        """POST /api/admin/login with correct password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "yrvante2025"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get("success") == True, "Should return success: true"
        print("PASS: Admin login with correct password succeeds")
    
    def test_admin_login_failure(self):
        """POST /api/admin/login with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrongpassword"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("PASS: Admin login with wrong password returns 401")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
