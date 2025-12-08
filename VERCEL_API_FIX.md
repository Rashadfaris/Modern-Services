# Fixing 404 on /api/send-email

## ❌ The Problem

After deploying with Option 1, you're getting:

- **404 error** on `/api/send-email`
- **401 error** on `/site.webmanifest`
- API functions not being detected by Vercel

## ✅ What I Fixed

1. **Updated `vercel.json`** - Changed to modern Vercel configuration
2. **Added functions configuration** - Explicitly tells Vercel about API functions
3. **Fixed manifest headers** - Added CORS headers for manifest file

## 🔧 The Solution

### Updated vercel.json

The new configuration:

- Uses `buildCommand` and `outputDirectory` for frontend
- Explicitly defines API functions with `@vercel/node` runtime
- Properly routes `/api/*` requests to API functions
- Fixes manifest file headers

## 🚀 What You Need to Do

### Step 1: Verify API Functions Exist

Make sure these files exist:

```
Modern-Services/
├── api/
│   ├── send-email.js  ✅
│   └── health.js      ✅
```

### Step 2: Check API Function Format

Both files should export a default handler:

```javascript
export default async function handler(req, res) {
  // ... your code
}
```

### Step 3: Set Environment Variables in Vercel

Go to **Vercel Dashboard → Settings → Environment Variables**

Add:

```
SMTP_HOST = smtp.hostinger.com
SMTP_PORT = 587
SMTP_USER = info@modernservices.org.uk
SMTP_PASSWORD = MuFaMod*!
```

**Important:** Select all environments (Production, Preview, Development)

### Step 4: Redeploy

1. **Commit and push:**

   ```bash
   git add .
   git commit -m "Fix Vercel API configuration"
   git push
   ```

2. **Or redeploy from Vercel dashboard**

### Step 5: Verify After Deployment

1. Check Vercel build logs - should see:

   - "Building functions" or "Detected API routes"
   - No errors about missing API functions

2. Test API endpoint:

   - Visit: `https://your-site.vercel.app/api/health`
   - Should return: `{"status":"ok","message":"Server is running",...}`

3. Test contact form:
   - Should call `/api/send-email` successfully
   - No 404 errors

## 🐛 If Still Getting 404

### Check 1: Verify Root Folder

In Vercel Dashboard → Settings → General:

- **Root Directory** should be: `.` (empty) or `Modern-Services/`
- **NOT** `backend-only/`

### Check 2: Check Build Logs

In Vercel Dashboard → Deployments → Click on deployment → View Function Logs:

- Should see API functions listed
- No errors about missing files

### Check 3: Verify File Structure

Make sure `api/` folder is in the root:

```
Modern-Services/
├── api/              ← Must be here
│   ├── send-email.js
│   └── health.js
├── package.json
├── vercel.json
└── ...
```

### Check 4: Test API Directly

After deployment, test:

- `https://your-site.vercel.app/api/health` - Should work
- `https://your-site.vercel.app/api/send-email` - Should return error (needs POST), not 404

If `/api/health` works but `/api/send-email` returns 404, there's an issue with the function export.

---

**After these fixes, the API should work correctly!**
