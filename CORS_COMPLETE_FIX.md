# Complete CORS Fix Guide

## ❌ The Problem

Your frontend is calling `https://your-project.vercel.app/api/send-email` (placeholder) instead of `https://modern-services.vercel.app/api/send-email`.

**Root Cause:** The frontend was built with a placeholder URL baked into the JavaScript bundle.

## ✅ What I Fixed

### 1. Updated ContactPage.tsx

- Now automatically uses `window.location.origin` if `VITE_API_URL` is not set
- This means it will use `https://modern-services.vercel.app` automatically
- No need to set environment variable if frontend and backend are on same domain

### 2. Improved CORS Headers

- Updated `api/send-email.js` and `api/health.js` with better CORS handling
- Now properly handles the origin header
- Added `Access-Control-Max-Age` for better performance

## 🔧 What You Need to Do

### Option 1: Let It Use Same Origin (Recommended)

Since your frontend and backend are both on `modern-services.vercel.app`, you can:

1. **Don't set `VITE_API_URL`** - The code will automatically use the same domain
2. **Rebuild frontend:**
   ```bash
   npm run build
   ```
3. **Redeploy to Vercel**

### Option 2: Set Environment Variable in Vercel

If you want to explicitly set it:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL = https://modern-services.vercel.app
   ```
3. **Redeploy** (this will rebuild with the new variable)

### Option 3: Set in Local .env (for local development)

Create `.env` file in project root:

```env
VITE_API_URL=https://modern-services.vercel.app
```

Then rebuild:

```bash
npm run build
```

## 🚀 Deployment Steps

1. **Rebuild frontend:**

   ```bash
   npm run build
   ```

2. **Commit and push** (if using Git):

   ```bash
   git add .
   git commit -m "Fix CORS and API URL"
   git push
   ```

3. **Or redeploy from Vercel dashboard:**
   - Go to Deployments
   - Click "Redeploy" on latest deployment

## 🧪 Testing

After redeploying:

1. Visit: `https://modern-services.vercel.app`
2. Open browser console (F12)
3. Go to Contact page
4. Fill form and submit
5. Check console - should see no CORS errors
6. Check Network tab - should see request to `https://modern-services.vercel.app/api/send-email`

## 📝 Important Notes

- **Same Domain:** Since both frontend and backend are on `modern-services.vercel.app`, the code will automatically use the same origin
- **No .env needed:** If you don't set `VITE_API_URL`, it uses `window.location.origin` automatically
- **CORS is fixed:** The serverless functions now properly handle CORS for your domain

## ✅ After Fix

The contact form should work without any CORS errors. The frontend will automatically call:

- `https://modern-services.vercel.app/api/send-email` (same domain)

Instead of:

- `https://your-project.vercel.app/api/send-email` (placeholder - wrong!)

---

**Next Step:** Rebuild and redeploy. The CORS issue will be resolved!
