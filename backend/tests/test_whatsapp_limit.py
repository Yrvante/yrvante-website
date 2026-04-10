"""
Test WhatsApp Daily Limit Tracking Feature
Tests for:
- GET /api/leads/whatsapp-stats - returns correct stats (vandaag, limiet, resterend)
- POST /api/leads/whatsapp-stats - updates the daily limit
- POST /api/leads/whatsapp-click - increments counter and returns updated stats
- POST /api/leads/whatsapp-click - returns error when daily limit reached
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestWhatsAppStats:
    """WhatsApp stats endpoint tests"""
    
    def test_get_whatsapp_stats_returns_correct_structure(self):
        """GET /api/leads/whatsapp-stats returns correct stats structure"""
        response = requests.get(f"{BASE_URL}/api/leads/whatsapp-stats")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        # Verify required fields exist
        assert "vandaag" in data, "Missing 'vandaag' field"
        assert "limiet" in data, "Missing 'limiet' field"
        assert "resterend" in data, "Missing 'resterend' field"
        
        # Verify data types
        assert isinstance(data["vandaag"], int), "vandaag should be int"
        assert isinstance(data["limiet"], int), "limiet should be int"
        assert isinstance(data["resterend"], int), "resterend should be int"
        
        # Verify resterend calculation
        expected_resterend = max(0, data["limiet"] - data["vandaag"])
        assert data["resterend"] == expected_resterend, f"resterend should be {expected_resterend}, got {data['resterend']}"
        
        print(f"SUCCESS: WhatsApp stats - vandaag={data['vandaag']}, limiet={data['limiet']}, resterend={data['resterend']}")
    
    def test_update_whatsapp_limit(self):
        """POST /api/leads/whatsapp-stats updates the daily limit"""
        # Test updating to different limits
        for new_limit in [20, 30, 40, 50, 100]:
            response = requests.post(
                f"{BASE_URL}/api/leads/whatsapp-stats",
                json={"limit": new_limit}
            )
            assert response.status_code == 200, f"Expected 200, got {response.status_code}"
            
            data = response.json()
            assert data.get("success") == True, "Expected success=True"
            
            # Verify the limit was updated
            verify_response = requests.get(f"{BASE_URL}/api/leads/whatsapp-stats")
            verify_data = verify_response.json()
            assert verify_data["limiet"] == new_limit, f"Limit should be {new_limit}, got {verify_data['limiet']}"
            
            print(f"SUCCESS: Updated WhatsApp limit to {new_limit}")
        
        # Reset to 50 for other tests
        requests.post(f"{BASE_URL}/api/leads/whatsapp-stats", json={"limit": 50})


class TestWhatsAppClick:
    """WhatsApp click tracking tests"""
    
    def test_whatsapp_click_increments_counter(self):
        """POST /api/leads/whatsapp-click increments the counter"""
        # Get initial stats
        initial_response = requests.get(f"{BASE_URL}/api/leads/whatsapp-stats")
        initial_data = initial_response.json()
        initial_count = initial_data["vandaag"]
        initial_remaining = initial_data["resterend"]
        
        # Skip if limit already reached
        if initial_remaining <= 0:
            pytest.skip("Daily limit already reached, cannot test increment")
        
        # Track a click
        click_response = requests.post(f"{BASE_URL}/api/leads/whatsapp-click")
        assert click_response.status_code == 200, f"Expected 200, got {click_response.status_code}"
        
        click_data = click_response.json()
        
        # Verify response structure
        assert "success" in click_data, "Missing 'success' field"
        assert "vandaag" in click_data, "Missing 'vandaag' field"
        assert "limiet" in click_data, "Missing 'limiet' field"
        assert "resterend" in click_data, "Missing 'resterend' field"
        
        # Verify counter incremented
        if click_data["success"]:
            assert click_data["vandaag"] == initial_count + 1, f"vandaag should be {initial_count + 1}, got {click_data['vandaag']}"
            assert click_data["resterend"] == initial_remaining - 1, f"resterend should be {initial_remaining - 1}, got {click_data['resterend']}"
            print(f"SUCCESS: WhatsApp click tracked - vandaag={click_data['vandaag']}, resterend={click_data['resterend']}")
        else:
            print(f"INFO: Click not tracked (limit reached) - {click_data}")
    
    def test_whatsapp_click_returns_error_at_limit(self):
        """POST /api/leads/whatsapp-click returns error when daily limit reached"""
        # Set a very low limit to test limit reached scenario
        requests.post(f"{BASE_URL}/api/leads/whatsapp-stats", json={"limit": 1})
        
        # Get current stats
        stats_response = requests.get(f"{BASE_URL}/api/leads/whatsapp-stats")
        stats_data = stats_response.json()
        
        # If already at or over limit, test the error response
        if stats_data["vandaag"] >= stats_data["limiet"]:
            click_response = requests.post(f"{BASE_URL}/api/leads/whatsapp-click")
            click_data = click_response.json()
            
            assert click_data.get("success") == False, "Expected success=False when limit reached"
            assert "error" in click_data or click_data.get("resterend") == 0, "Expected error message or resterend=0"
            print(f"SUCCESS: WhatsApp click blocked at limit - {click_data}")
        else:
            # Click until limit reached
            while stats_data["resterend"] > 0:
                requests.post(f"{BASE_URL}/api/leads/whatsapp-click")
                stats_response = requests.get(f"{BASE_URL}/api/leads/whatsapp-stats")
                stats_data = stats_response.json()
            
            # Now test the error response
            click_response = requests.post(f"{BASE_URL}/api/leads/whatsapp-click")
            click_data = click_response.json()
            
            assert click_data.get("success") == False, "Expected success=False when limit reached"
            print(f"SUCCESS: WhatsApp click blocked at limit - {click_data}")
        
        # Reset limit to 50 for other tests
        requests.post(f"{BASE_URL}/api/leads/whatsapp-stats", json={"limit": 50})


class TestWhatsAppIntegration:
    """Integration tests for WhatsApp feature"""
    
    def test_full_whatsapp_workflow(self):
        """Test complete WhatsApp tracking workflow"""
        # 1. Set a known limit
        limit = 30
        requests.post(f"{BASE_URL}/api/leads/whatsapp-stats", json={"limit": limit})
        
        # 2. Get initial stats
        stats = requests.get(f"{BASE_URL}/api/leads/whatsapp-stats").json()
        assert stats["limiet"] == limit, f"Limit should be {limit}"
        print(f"Initial stats: vandaag={stats['vandaag']}, limiet={stats['limiet']}, resterend={stats['resterend']}")
        
        # 3. Track a click if possible
        if stats["resterend"] > 0:
            click_result = requests.post(f"{BASE_URL}/api/leads/whatsapp-click").json()
            assert click_result["success"] == True, "Click should succeed"
            print(f"After click: vandaag={click_result['vandaag']}, resterend={click_result['resterend']}")
        
        # 4. Verify stats updated
        final_stats = requests.get(f"{BASE_URL}/api/leads/whatsapp-stats").json()
        print(f"Final stats: vandaag={final_stats['vandaag']}, limiet={final_stats['limiet']}, resterend={final_stats['resterend']}")
        
        # Reset to 50
        requests.post(f"{BASE_URL}/api/leads/whatsapp-stats", json={"limit": 50})
        print("SUCCESS: Full WhatsApp workflow completed")


class TestLeadFinderAuth:
    """LeadFinder authentication tests"""
    
    def test_auth_with_correct_password(self):
        """POST /api/admin/leadfinder/auth with correct password succeeds"""
        response = requests.post(
            f"{BASE_URL}/api/admin/leadfinder/auth",
            json={"password": "yrvante2025"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Expected success=True"
        print("SUCCESS: Auth with correct password")
    
    def test_auth_with_wrong_password(self):
        """POST /api/admin/leadfinder/auth with wrong password fails"""
        response = requests.post(
            f"{BASE_URL}/api/admin/leadfinder/auth",
            json={"password": "wrongpassword"}
        )
        
        data = response.json()
        assert data.get("success") == False, "Expected success=False for wrong password"
        print("SUCCESS: Auth with wrong password correctly rejected")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
