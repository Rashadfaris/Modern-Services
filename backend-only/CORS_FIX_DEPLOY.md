# 🔒 CORS Fix - Deploy Instructions

## ✅ CORS Configuration Fixed

I've updated the CORS configuration in `backend-only/index.js` to properly handle preflight requests from `https://modernservices.org.uk`.

## 🚀 Deploy the Fix

### Option 1: Via Railway Dashboard (Recommended)

1. **Go to Railway Dashboard:**

   - https://railway.com/project/f5d3a469-cb9a-45d6-8aa0-803979dc85fe
   - Click on your service: `modern-services-backend`

2. **Redeploy:**
   - Click **"Redeploy"** or **"Deploy"** button
   - Railway will automatically detect the changes in your code
   - Wait for deployment to complete (1-2 minutes)

### Option 2: Via Git (If Connected)

If Railway is connected to your GitHub repo:

```bash
# Commit the changes
git add backend-only/index.js
git commit -m "Fix CORS configuration for modernservices.org.uk"
git push
```

Railway will automatically deploy when you push.

### Option 3: Manual Upload

1. **Go to Railway Dashboard**
2. **Settings** → **Source**
3. **Redeploy** from the latest commit

## ✅ What Was Fixed

1. **Improved CORS middleware** - Now properly validates origins
2. **Explicit OPTIONS handler** - Handles preflight requests correctly
3. **Moved OPTIONS handler** - Placed before routes to catch preflight requests

## 🧪 Test After Deployment

After redeploying, test from your Hostinger site:

1. **Open browser console** (F12)
2. **Run this test:**

   ```javascript
   fetch("https://modern-services-backend-production.up.railway.app/api/health")
     .then((res) => res.json())
     .then((data) => console.log("✅ CORS working!", data))
     .catch((err) => console.error("❌ CORS error:", err));
   ```

3. **Try the contact form** - Should work without CORS errors

## 📝 Changes Made

**File:** `backend-only/index.js`

- Enhanced CORS middleware with origin validation
- Added explicit OPTIONS handler for preflight requests
- Moved OPTIONS handler before route handlers

## ⚠️ If Still Getting CORS Errors

1. **Clear browser cache** and try again
2. **Wait 1-2 minutes** after deployment for changes to propagate
3. **Check Railway logs** to ensure deployment was successful
4. **Verify the origin** in browser console matches exactly: `https://modernservices.org.uk`

## ✅ Expected Result

After deployment:

- ✅ No CORS errors in browser console
- ✅ Contact form submits successfully
- ✅ Email is sent via Railway backend
