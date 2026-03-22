// api/admin/_db.js
// Shared Vercel Postgres helpers — table init + auth check
import { sql } from '@vercel/postgres';

export async function initTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      naam VARCHAR(255) NOT NULL,
      adres TEXT,
      telefoonnummer VARCHAR(50),
      google_maps_url TEXT,
      place_id VARCHAR(255) UNIQUE,
      branche VARCHAR(100),
      stad VARCHAR(100),
      status VARCHAR(50) DEFAULT 'Nieuw',
      notitie TEXT,
      opgeslagen_op TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS admin_search_history (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      branche VARCHAR(100),
      stad VARCHAR(100),
      totaal INTEGER,
      datum TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(branche, stad)
    );
    CREATE TABLE IF NOT EXISTS admin_share_reports (
      token VARCHAR(50) PRIMARY KEY,
      titel VARCHAR(255),
      leads JSONB,
      aangemaakt_op TIMESTAMPTZ DEFAULT NOW(),
      totaal INTEGER
    );
    CREATE TABLE IF NOT EXISTS admin_sheets_config (
      key VARCHAR(50) PRIMARY KEY,
      value TEXT
    );
  `;
}

export function checkAuth(req, res) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    return decoded === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
