# 🚂 Railway Terminal Deployment - Quick Guide

## Step 1: Login to Railway

Run this command and press **Y** when prompted to open browser:

```powershell
railway login
```

This will:

1. Open your browser
2. Ask you to authorize Railway CLI
3. Return to terminal when done

## Step 2: Link to Project (or Create New)

**Option A: Link to existing project**

```powershell
railway link
```

Then select your project from the list.

**Option B: Create new project**

```powershell
railway init
```

## Step 3: Set Environment Variables

```powershell
railway variables set SMTP_HOST=smtp.hostinger.com
railway variables set SMTP_PORT=587
railway variables set SMTP_USER=info@modernservices.org.uk
railway variables set SMTP_PASSWORD=your_actual_password_here
```

**Or set all at once:**

```powershell
railway variables set SMTP_HOST=smtp.hostinger.com SMTP_PORT=587 SMTP_USER=info@modernservices.org.uk SMTP_PASSWORD=your_password
```

## Step 4: Set Root Directory (Important!)

Railway needs to know to use the `backend-only` folder. You can do this via:

**Option A: Via Dashboard (Recommended)**

1. Go to Railway Dashboard
2. Select your service
3. Settings → Root Directory
4. Set to: `backend-only`

**Option B: Via CLI (if supported)**
Check Railway docs for CLI root directory setting.

## Step 5: Deploy

```powershell
railway up
```

This will:

- Build your app
- Deploy to Railway
- Give you a URL like: `https://your-app.up.railway.app`

## Step 6: Get Your URL

```powershell
railway domain
```

Or check Railway dashboard for your service URL.

## ✅ Complete Command Sequence

```powershell
# 1. Login (press Y when prompted)
railway login

# 2. Link to project
railway link

# 3. Set secrets (replace YOUR_PASSWORD)
railway variables set SMTP_HOST=smtp.hostinger.com SMTP_PORT=587 SMTP_USER=info@modernservices.org.uk SMTP_PASSWORD=YOUR_PASSWORD

# 4. Deploy
railway up

# 5. Get URL
railway domain
```

## 🔍 Useful Commands

```powershell
railway status      # Check project status
railway logs        # View logs
railway variables   # List environment variables
railway open        # Open in browser
```

## 📝 Notes

- **Root Directory:** Must be set to `backend-only` in Railway dashboard
- **No Payment Method:** Railway free tier doesn't require payment method
- **Auto-deploy:** Railway auto-deploys on Git push (if connected)
