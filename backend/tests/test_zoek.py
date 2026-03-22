"""Backend tests for Yrvante Lead Finder - /api/zoek endpoint"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://admin-leads-1.preview.emergentagent.com').rstrip('/')


class TestHealthCheck:
    """Health check"""
    def test_api_root(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert "message" in r.json()


class TestZoekEndpoint:
    """Tests for POST /api/zoek"""

    def test_zoek_returns_200(self):
        r = requests.post(f"{BASE_URL}/api/zoek", json={"branche": "restaurant", "stad": "Amsterdam"})
        assert r.status_code == 200

    def test_zoek_response_structure(self):
        r = requests.post(f"{BASE_URL}/api/zoek", json={"branche": "restaurant", "stad": "Amsterdam"})
        assert r.status_code == 200
        data = r.json()
        assert "totaal_gevonden" in data
        assert "leads" in data
        assert isinstance(data["totaal_gevonden"], int)
        assert isinstance(data["leads"], list)

    def test_zoek_leads_fields(self):
        r = requests.post(f"{BASE_URL}/api/zoek", json={"branche": "restaurant", "stad": "Amsterdam"})
        assert r.status_code == 200
        leads = r.json().get("leads", [])
        if leads:
            lead = leads[0]
            assert "naam" in lead
            assert "adres" in lead
            assert "google_maps_url" in lead
            assert "place_id" in lead
            # telefoonnummer can be None but must be present
            assert "telefoonnummer" in lead

    def test_zoek_no_website_filter(self):
        """All returned leads should not have websiteUri (filtered by backend)"""
        r = requests.post(f"{BASE_URL}/api/zoek", json={"branche": "restaurant", "stad": "Amsterdam"})
        assert r.status_code == 200
        leads = r.json().get("leads", [])
        # websiteUri should NOT be in the response (backend strips it)
        for lead in leads:
            assert "websiteUri" not in lead

    def test_zoek_totaal_gte_leads(self):
        """totaal_gevonden >= leads count (since we filter out businesses with websites)"""
        r = requests.post(f"{BASE_URL}/api/zoek", json={"branche": "restaurant", "stad": "Amsterdam"})
        assert r.status_code == 200
        data = r.json()
        assert data["totaal_gevonden"] >= len(data["leads"])

    def test_zoek_empty_branche_returns_422(self):
        r = requests.post(f"{BASE_URL}/api/zoek", json={"branche": "", "stad": "Amsterdam"})
        assert r.status_code == 422

    def test_zoek_empty_stad_returns_422(self):
        r = requests.post(f"{BASE_URL}/api/zoek", json={"branche": "restaurant", "stad": ""})
        assert r.status_code == 422

    def test_zoek_missing_fields_returns_422(self):
        r = requests.post(f"{BASE_URL}/api/zoek", json={})
        assert r.status_code == 422

    def test_zoek_google_maps_url_format(self):
        r = requests.post(f"{BASE_URL}/api/zoek", json={"branche": "restaurant", "stad": "Amsterdam"})
        assert r.status_code == 200
        leads = r.json().get("leads", [])
        if leads:
            for lead in leads[:5]:
                assert lead["google_maps_url"].startswith("https://")
