# Runway27 Main

A cinematic, responsive website concept for Runway27 — dining, late-night lounge experiences, and events. Built with React, TypeScript, Vite, React Three Fiber / Three.js, Framer Motion, and Lucide icons.

## Run locally
```bash
npm install
npm run dev
```
Production build: `npm run build`; preview: `npm run preview`.

## Brand assets
- `public/runway27-logo.svg` — vector Runway27 Kitchen & Bar wordmark used in the header and footer. This is a web-ready approximation of the supplied gold/black reference; replace with the original high-resolution artwork when the source image can be uploaded as a repository asset.

## Included
- Interactive WebGL runway hero with reduced-motion/mobile-friendly fallback
- Dining, lounge, events, menu, reservation, and contact sections
- Responsive navigation and motion-led reveals
- Sample menu and event content to demonstrate layouts
- Reservation form front-end validation only

## Before launch
This is a front-end prototype, not a production booking or ticketing system. Reservation submissions are demo-only and are not sent to a server or stored. Event ticket actions are placeholders. No payment processing, user accounts, admin portal, database, or backend API is connected. Replace sample menu, prices, events, photography, address, and contact details with approved business content. Add server-side validation, booking capacity checks, secure admin authentication, privacy/terms pages, and tests before accepting real bookings or payments.

## Suggested next phase
Build an ASP.NET Core Web API with SQL Server, role-based staff/admin access, reservation management, event and ticket inventory, audit logging, and email notifications. Add payment-provider checkout only if tickets or deposits are required.
