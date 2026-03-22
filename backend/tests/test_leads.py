"""Backend tests for Yrvante Lead Finder v2 - leads, dashboard, sheets, search"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s

# Test: POST /api/zoek
def test_zoek_kapper_rotterdam(session):
    res = session.post(f"{BASE_URL}/api/zoek", json={"branche": "kapper", "stad": "Rotterdam"})
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    assert "totaal_gevonden" in data
    assert "leads" in data
    assert isinstance(data["leads"], list)
    print(f"PASS: zoek kapper Rotterdam - {data['totaal_gevonden']} found, {len(data['leads'])} leads without website")

# Test: POST /api/leads - save a lead
def test_save_lead(session):
    payload = {
        "naam": "TEST_Kapper Almelo",
        "adres": "Teststraat 1, Almelo",
        "telefoonnummer": "0612345678",
        "google_maps_url": "https://maps.google.com/?q=test",
        "place_id": "TEST_PLACE_ID_001",
        "branche": "kapper",
        "stad": "Almelo"
    }
    res = session.post(f"{BASE_URL}/api/leads", json=payload)
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    assert data["naam"] == payload["naam"]
    assert data["status"] == "Nieuw"
    assert "id" in data
    print(f"PASS: save lead - id={data['id']}")
    return data["id"]

# Test: GET /api/leads
def test_get_leads(session):
    res = session.get(f"{BASE_URL}/api/leads")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    assert isinstance(data, list)
    print(f"PASS: get leads - {len(data)} leads returned")

# Test: PUT /api/leads/{id} - update status
def test_update_lead_status(session):
    # First save a lead to get an ID
    payload = {
        "naam": "TEST_Update Lead",
        "adres": "Updatestraat 2, Rotterdam",
        "telefoonnummer": None,
        "google_maps_url": "https://maps.google.com/?q=test2",
        "place_id": "TEST_PLACE_ID_002",
        "branche": "loodgieter",
        "stad": "Rotterdam"
    }
    save_res = session.post(f"{BASE_URL}/api/leads", json=payload)
    assert save_res.status_code == 200
    lead_id = save_res.json()["id"]

    # Update status
    res = session.put(f"{BASE_URL}/api/leads/{lead_id}", json={"status": "Gebeld"})
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    assert data["status"] == "Gebeld"
    print(f"PASS: update status -> Gebeld for id={lead_id}")

# Test: DELETE /api/leads/{id}
def test_delete_lead(session):
    # Save a lead to delete
    payload = {
        "naam": "TEST_Delete Lead",
        "adres": "Deletestraat 3",
        "telefoonnummer": None,
        "google_maps_url": "https://maps.google.com/?q=test3",
        "place_id": "TEST_PLACE_ID_003",
        "branche": "bakker",
        "stad": "Utrecht"
    }
    save_res = session.post(f"{BASE_URL}/api/leads", json=payload)
    assert save_res.status_code == 200
    lead_id = save_res.json()["id"]

    # Delete
    del_res = session.delete(f"{BASE_URL}/api/leads/{lead_id}")
    assert del_res.status_code == 200, f"Expected 200, got {del_res.status_code}: {del_res.text}"
    print(f"PASS: delete lead id={lead_id}")

    # Verify 404
    get_res = session.get(f"{BASE_URL}/api/leads")
    ids = [l["id"] for l in get_res.json()]
    assert lead_id not in ids
    print("PASS: deleted lead not found in list")

# Test: GET /api/dashboard
def test_dashboard(session):
    res = session.get(f"{BASE_URL}/api/dashboard")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    assert "totaal_opgeslagen" in data
    assert "status_verdeling" in data
    assert "recente_zoekopdrachten" in data
    assert "top_branchen" in data
    print(f"PASS: dashboard - totaal={data['totaal_opgeslagen']}, verdeling={data['status_verdeling']}")

# Test: GET /api/sheets/status
def test_sheets_status(session):
    res = session.get(f"{BASE_URL}/api/sheets/status")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    assert "configured" in data
    assert "connected" in data
    # Google Sheets credentials are configured (client_id set in v3+)
    assert data["configured"] == True
    print(f"PASS: sheets status - configured={data['configured']}, connected={data['connected']}")

# Cleanup test data
def test_cleanup(session):
    res = session.get(f"{BASE_URL}/api/leads")
    assert res.status_code == 200
    for lead in res.json():
        if lead["naam"].startswith("TEST_"):
            session.delete(f"{BASE_URL}/api/leads/{lead['id']}")
    print("PASS: cleanup done")
