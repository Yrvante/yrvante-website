"""Backend tests for Yrvante Lead Finder v3 - pagination, share report, sheets configured"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Test: POST /api/zoek returns next_page_token
def test_zoek_with_pagination_token(session):
    res = session.post(f"{BASE_URL}/api/zoek", json={"branche": "loodgieter", "stad": "Utrecht"})
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    assert "totaal_gevonden" in data
    assert "leads" in data
    assert "next_page_token" in data  # field must exist even if None
    print(f"PASS: zoek loodgieter Utrecht - totaal={data['totaal_gevonden']}, leads={len(data['leads'])}, next_page_token={'present' if data.get('next_page_token') else 'null'}")


# Test: POST /api/zoek with page_token (pagination) - load next page
def test_zoek_laad_meer(session):
    # First page
    res1 = session.post(f"{BASE_URL}/api/zoek", json={"branche": "kapper", "stad": "Amsterdam"})
    assert res1.status_code == 200
    data1 = res1.json()
    next_token = data1.get("next_page_token")
    print(f"  First page: {data1['totaal_gevonden']} found, next_token={'present' if next_token else 'null'}")

    if next_token:
        # Load next page
        res2 = session.post(f"{BASE_URL}/api/zoek", json={"branche": "kapper", "stad": "Amsterdam", "page_token": next_token})
        assert res2.status_code == 200, f"Expected 200, got {res2.status_code}: {res2.text}"
        data2 = res2.json()
        assert "leads" in data2
        assert "totaal_gevonden" in data2
        print(f"PASS: laad meer (next page) - {data2['totaal_gevonden']} found, {len(data2['leads'])} leads")
    else:
        print("INFO: No next_page_token in first page response (fewer than 20 results) - pagination not needed")
        pytest.skip("No next_page_token available to test pagination")


# Test: POST /api/share creates a share token
def test_create_share(session):
    res = session.post(f"{BASE_URL}/api/share")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    assert "token" in data, f"Missing 'token' in response: {data}"
    assert "url" in data, f"Missing 'url' in response: {data}"
    assert data["token"] != "", "Token should not be empty"
    assert "/share/" in data["url"], f"URL should contain /share/: {data['url']}"
    print(f"PASS: create share - token={data['token']}, url={data['url']}")
    return data["token"]


# Test: GET /api/share/{token} returns report
def test_get_share(session):
    # Create a share first
    create_res = session.post(f"{BASE_URL}/api/share")
    assert create_res.status_code == 200
    token = create_res.json()["token"]

    # Get the share
    get_res = session.get(f"{BASE_URL}/api/share/{token}")
    assert get_res.status_code == 200, f"Expected 200, got {get_res.status_code}: {get_res.text}"
    data = get_res.json()
    assert "token" in data
    assert data["token"] == token
    assert "leads" in data
    assert "totaal" in data
    assert "aangemaakt_op" in data
    print(f"PASS: get share - token={token}, totaal={data['totaal']}")


# Test: GET /api/share/{token} with invalid token returns 404
def test_get_share_invalid_token(session):
    res = session.get(f"{BASE_URL}/api/share/invalidtoken999")
    assert res.status_code == 404, f"Expected 404, got {res.status_code}: {res.text}"
    print("PASS: invalid share token returns 404")


# Test: GET /api/sheets/status returns configured=true (client id is set)
def test_sheets_status_configured(session):
    res = session.get(f"{BASE_URL}/api/sheets/status")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    assert "configured" in data
    assert "connected" in data
    # v3: client id is configured
    assert data["configured"] == True, f"Expected configured=True, got {data['configured']}"
    print(f"PASS: sheets status - configured={data['configured']}, connected={data['connected']}")


# Test: GET /api/sheets/login returns auth_url
def test_sheets_login_auth_url(session):
    res = session.get(f"{BASE_URL}/api/sheets/login")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    assert "auth_url" in data, f"Missing 'auth_url' in response: {data}"
    assert "accounts.google.com" in data["auth_url"], f"auth_url should be Google OAuth: {data['auth_url']}"
    print(f"PASS: sheets login - auth_url present and is Google OAuth URL")
