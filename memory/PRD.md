# Yrvante Website - Product Requirements Document

## Original Problem Statement
Build a modern tech company website for Yrvante - a Dutch web development startup based in Almelo, Netherlands. The website should generate new clients that need a website.

## Brand Identity
- **Name**: Yrvante
- **Slogan**: "Smart web & software"
- **Founder**: Yvar Bredewold
- **Location**: Almelo, Overijssel, Netherlands
- **Contact Email**: yvar@yrvante.com

## User Personas
1. **ZZP'ers (Freelancers)** - Self-employed professionals needing a professional online presence
2. **Small Businesses** - Companies with outdated or no websites
3. **Startups** - New companies needing modern web presence

## Core Requirements (Static)
- Dutch as default language with English toggle
- Black & white minimalist design matching the logo
- Sticky navigation with smooth scrolling
- Mobile responsive layout
- Contact form with email notification
- Sections: Hero, Services, Target Audience, About, Portfolio, Why Choose Us, Contact

## What's Been Implemented (December 2025)
- [x] Full landing page with all required sections
- [x] Dutch/English language toggle functionality
- [x] Sticky navigation with smooth scroll to sections
- [x] Contact form with MongoDB storage
- [x] Resend email integration (ready - needs API key)
- [x] Mobile responsive design with hamburger menu
- [x] Playfair Display serif headings, DM Sans body text
- [x] Framer Motion animations
- [x] Logo integration from CDN
- [x] Portfolio placeholders for future projects

## Tech Stack
- **Frontend**: React 19 + Tailwind CSS + Framer Motion
- **Backend**: FastAPI + Motor (MongoDB async)
- **Database**: MongoDB
- **Email**: Resend (API key needed for live emails)

## P0 Features (Completed)
- Landing page with all sections
- Language toggle (NL/EN)
- Contact form submission
- Mobile responsive design

## P1 Features (Future)
- Resend API key configuration for live email notifications
- Google Analytics integration
- Portfolio project pages
- SEO meta tags optimization
- Cookie consent banner

## P2 Features (Future)
- Blog/News section
- Client testimonials
- Pricing packages display
- Chat widget
- WhatsApp integration

## Next Tasks
1. Add Resend API key to enable email notifications
2. Add real portfolio projects when available
3. Consider adding pricing section
4. SEO optimization
