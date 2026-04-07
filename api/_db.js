import { sql } from '@vercel/postgres';

export async function initTables() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT NOT NULL,
        package VARCHAR(100),
        email_sent BOOLEAN DEFAULT false,
        read BOOLEAN DEFAULT false,
        timestamp TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS page_views (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        page VARCHAR(255) NOT NULL,
        visitor_id VARCHAR(255) NOT NULL,
        user_agent TEXT,
        ip_address VARCHAR(50),
        referrer TEXT,
        timestamp TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS csv_leads (
        id VARCHAR(255) PRIMARY KEY,
        naam VARCHAR(500) DEFAULT '',
        categorie VARCHAR(255) DEFAULT '',
        adres VARCHAR(500) DEFAULT '',
        telefoon VARCHAR(100) DEFAULT '',
        website VARCHAR(500) DEFAULT '',
        rating VARCHAR(50) DEFAULT '',
        aantalreviews VARCHAR(50) DEFAULT '',
        status VARCHAR(50) DEFAULT 'nieuw',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
  } catch (error) {
  }
}

export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
