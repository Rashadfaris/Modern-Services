# CORS Error Fix

## ❌ Error Explanation

**Error:** `Access to fetch at 'https://your-project.vercel.app/api/send-email' from origin 'https://modern-services.vercel.app' has been blocked by CORS policy`

**Causes:**

1. Frontend is using placeholder URL `your-project.vercel.app` instead of actual Vercel URL
2. CORS headers might not be set correctly in serverless function

## ✅ What I Fixed

1. **Updated CORS headers** in `api/send-email.js` and `api/health.js`
2. Added proper origin handling for Vercel

## 🔧 What You Need to Do

### Step 1: Update Frontend Environment Variable

Your frontend `.env` file has a placeholder. Update it:

**Current (WRONG):**

```env
VITE_API_URL=https://your-project.vercel.app
```

**Should be (CORRECT):**

```env
VITE_API_URL=https://modern-services.vercel.app
```

### Step 2: Rebuild Frontend

After updating `.env`:

```bash
npm run build
```

### Step 3: Redeploy to Vercel

- Push to Git (if connected), OR
- Redeploy from Vercel dashboard

## 🧪 Test After Fix

1. Visit: `https://modern-services.vercel.app`
2. Go to Contact page
3. Fill out form and submit
4. Should work without CORS errors

## 📝 Quick Checklist

- [ ] Updated `.env` with correct Vercel URL: `https://modern-services.vercel.app`
- [ ] Rebuilt frontend: `npm run build`
- [ ] Redeployed to Vercel
- [ ] Tested contact form - no CORS errors

---

**The main issue:** Your frontend is calling `your-project.vercel.app` (placeholder) instead of `modern-services.vercel.app` (your actual URL). Update the `.env` file!
