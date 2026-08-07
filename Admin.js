# Vedit: Video Editors — Full Website

Professional video/photo editing services + online editing classes platform, with a public
application tracker, Discord webhook notifications, and a secured admin dashboard.

```
vedit/
├── frontend/     Static site (HTML + Tailwind CDN + vanilla JS) — no build step
└── backend/      Node.js + Express + MongoDB API
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGODB_URI` — your MongoDB connection string (local `mongodb://localhost:27017/vedit` or Atlas)
- `JWT_SECRET` — any long random string
- `DISCORD_WEBHOOK_URL` — from Discord: *Server Settings → Integrations → Webhooks → New Webhook → Copy URL*
- `SMTP_*` — optional, only needed if you want application-confirmation emails to actually send
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — the first admin account

Seed the database (creates the first admin login + starter services/courses/testimonials):

```bash
npm run seed
```

Start the API:

```bash
npm start          # production
npm run dev         # with nodemon, auto-restart
```

The API runs at `http://localhost:5000/api` by default. Health check: `GET /api/health`.

## 2. Frontend setup

The frontend is plain static files — no build step. Two ways to run it:

**Quickest:** open `frontend/index.html` directly in a browser, or serve the folder with any
static server, e.g.:

```bash
cd frontend
npx serve .
```

**Point it at your backend:** by default the frontend calls `http://localhost:5000/api`. If
your backend runs elsewhere, set this before the other scripts load (e.g. add to the `<head>`
of each HTML file, or edit `frontend/js/api.js` directly):

```html
<script>window.VEDIT_API_BASE = 'https://your-backend-domain.com/api';</script>
```

Also update `CLIENT_ORIGIN` in the backend `.env` to match wherever you host the frontend, so
CORS allows it.

## 3. Logging into the admin dashboard

Go to `frontend/admin/login.html`, sign in with the `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
you set before seeding. From there you can:

- Review, search, filter, accept/reject/complete, and delete Service Requests, Class
  Applications, and Team Applications
- Export any of the three application types to CSV
- Manage Services, Courses, Testimonials, and Portfolio items (add/edit/delete — these feed
  the homepage sections live)

Admin roles: `super-admin`, `admin`, `moderator` (stored on the `Admin` model — extend
`middleware/auth.js`'s `requireRole()` on any route if you want role-gated actions beyond
login).

## 4. How application tracking works

Every submission (service request, class application, team application) generates an
Application ID like `VSR-4F2A9C` / `VCA-...` / `VTA-...`. Anyone can look up status — and only
status, no personal info — at `frontend/status.html`, publicly, no login required.

## 5. Discord webhook payload

Every submission posts an embed to your webhook with: Application ID, Type, Name, Discord
Username, Email, Course/Service, Date. If `DISCORD_WEBHOOK_URL` isn't set, submissions still
succeed — the webhook call just logs a warning and no-ops.

## 6. Tech stack

- **Frontend:** HTML, Tailwind CSS (CDN), vanilla JavaScript — dark purple/black glassmorphism
  theme, mobile responsive
- **Backend:** Node.js, Express.js, express-validator, express-rate-limit, JWT auth, bcrypt
- **Database:** MongoDB via Mongoose

## 7. Notes & next steps for production

- Put the backend behind HTTPS and set `NODE_ENV=production`
- Swap the `cors` origin in `.env` from `*` to your real frontend domain
- Consider adding refresh tokens if you want shorter-lived access tokens
- The CSV export and content-management endpoints are currently open to any authenticated
  admin; add `requireRole('super-admin')` in `routes/admin.js` on any action you want to
  restrict further
- Rotate `JWT_SECRET` and the seeded admin password before going live
