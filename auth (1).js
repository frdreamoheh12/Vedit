# Server
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5500

# MongoDB
MONGODB_URI=mongodb://localhost:27017/vedit

# Auth
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRES_IN=7d

# Discord webhook — create one in your server: Server Settings > Integrations > Webhooks
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/XXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Email (optional — used for application confirmation emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_FROM="Vedit: Video Editors <no-reply@vedit.studio>"

# Seed admin (used by npm run seed)
SEED_ADMIN_EMAIL=admin@vedit.studio
SEED_ADMIN_PASSWORD=ChangeMe123!
SEED_ADMIN_NAME=Studio Admin
