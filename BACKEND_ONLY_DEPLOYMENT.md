# Backend-Only Deployment Guide

## Root Folder Structure

**Root folder:** `Modern-Services/` (project root)

## Required Files in Root Folder

### 1. `api/` folder (REQUIRED)

```
api/
  ├── send-email.js
  └── health.js
```

### 2. `package.json` (REQUIRED - minimal version)

```json
{
  "name": "modern-services-backend",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "nodemailer": "^6.10.1"
  }
}
```

### 3. `vercel.json` (REQUIRED - API only)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
```

## Environment Variables (Set in Vercel Dashboard)

Go to Vercel → Settings → Environment Variables and add:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=MuFaMod*!
```

## Quick Setup Steps

1. **Create a new folder** (optional, for clean backend-only deployment):

   ```bash
   mkdir backend-only
   cd backend-only
   ```

2. **Copy required files:**

   - Copy `api/` folder
   - Copy `package.json` (or create minimal one above)
   - Copy `vercel.json` (or use the API-only version above)

3. **Deploy to Vercel:**

   - Connect the folder to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy

4. **Get your backend URL:**

   - Vercel will give you: `https://your-backend-name.vercel.app`
   - Your API will be at: `https://your-backend-name.vercel.app/api/send-email`

5. **Update frontend:**
   - Set `VITE_API_URL=https://your-backend-name.vercel.app` in frontend `.env`
   - Rebuild frontend

## Minimal File Structure

```
backend-only/
├── api/
│   ├── send-email.js
│   └── health.js
├── package.json
└── vercel.json
```

That's it! Just these files are needed.
