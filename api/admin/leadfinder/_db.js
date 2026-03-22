import { sql } from '@vercel/postgres';

export async function initTables() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS leadfinder_leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        naam VARCHAR(255) NOT NULL,
        adres TEXT,
        telefoonnummer VARCHAR(50),
        google_maps_url TEXT,
        place_id VARCHAR(255) UNIQUE,
        branche VARCHAR(100),
        stad VARCHAR(100),
        status VARCHAR(50) DEFAULT 'nieuw',
        notitie TEXT,
        opgeslagen_op TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS leadfinder_search_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        branche VARCHAR(100),
        stad VARCHAR(100),
        totaal INTEGER,
        datum TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(branche, stad)
      )
    `;
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
}

export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
