# 🚂 Railway Quick Start Guide

## 📍 Root Directory

**Set Root Directory to:** `backend-only/`

## 🔑 Environment Variables

Add these in Railway Dashboard → Variables:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=your_password_here
```

**Note:** `PORT` is automatically set by Railway (you don't need to add it).

## ✅ Quick Checklist

1. ✅ Root Directory: `backend-only/`
2. ✅ Environment Variables: All 4 SMTP variables set
3. ✅ Start Command: `npm start` (auto-detected)
4. ✅ Build Command: Not needed (leave empty)

## 🌐 Your Backend URL

After deployment, Railway will give you a URL like:
`https://your-project.up.railway.app`

Test endpoints:

- Health: `https://your-project.up.railway.app/api/health`
- Email: `https://your-project.up.railway.app/api/send-email`

## 📝 Full Guide

See `RAILWAY_DEPLOYMENT.md` for detailed instructions.
