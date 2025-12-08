# 🚀 Fly.io Quick Start

## Prerequisites

1. **Install Fly.io CLI:**

   ```bash
   # Windows (PowerShell)
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

   # macOS/Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login:**
   ```bash
   fly auth login
   ```

## Quick Deploy

```bash
# Navigate to backend directory
cd backend-only

# Launch app (first time only - creates/updates fly.toml)
fly launch

# Set environment variables
fly secrets set SMTP_HOST=smtp.hostinger.com SMTP_PORT=587 SMTP_USER=info@modernservices.org.uk SMTP_PASSWORD=your_password

# Deploy
fly deploy

# Open in browser
fly open
```

## Environment Variables

Set these secrets:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=your_password
```

## Your Backend URL

After deployment: `https://your-app.fly.dev`

- Health: `https://your-app.fly.dev/api/health`
- Email: `https://your-app.fly.dev/api/send-email`

## Useful Commands

```bash
fly status      # Check app status
fly logs        # View logs
fly secrets list # List secrets
fly open        # Open in browser
```

## Full Guide

See `FLY_DEPLOYMENT.md` for detailed instructions.
