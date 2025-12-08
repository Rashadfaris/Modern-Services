# Deploy Frontend + Backend Together on Vercel

## 📁 Root Folder Setup

**Use this folder as root in Vercel:**

```
Modern-Services/  (main project folder, NOT backend-only/)
```

## 🔧 Environment Variables

### Option A: Local `.env` file (for local development)

Create `.env` in `Modern-Services/` folder:

```env
# Firebase Configuration (REQUIRED)
VITE_FIREBASE_API_KEY=AIzaSyD_3FMW0V5KHCOuh5ntZAxW_9-aQOqfUNU
VITE_FIREBASE_AUTH_DOMAIN=modern-services-4675.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=modern-services-4675
VITE_FIREBASE_STORAGE_BUCKET=modern-services-4675.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=243995977354
VITE_FIREBASE_APP_ID=1:243995977354:web:fbbe9964741567e74c6f73
VITE_FIREBASE_MEASUREMENT_ID=G-CD0Q00J8WE

# API URL (OPTIONAL - Leave empty for same origin)
# If empty, frontend will automatically use same domain
VITE_API_URL=

# SMTP Configuration (for API functions)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=MuFaMod*!
```

### Option B: Vercel Environment Variables (for production)

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables:

#### For Frontend Build (VITE\_\* variables):

```
VITE_FIREBASE_API_KEY = AIzaSyD_3FMW0V5KHCOuh5ntZAxW_9-aQOqfUNU
VITE_FIREBASE_AUTH_DOMAIN = modern-services-4675.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = modern-services-4675
VITE_FIREBASE_STORAGE_BUCKET = modern-services-4675.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 243995977354
VITE_FIREBASE_APP_ID = 1:243995977354:web:fbbe9964741567e74c6f73
VITE_FIREBASE_MEASUREMENT_ID = G-CD0Q00J8WE
VITE_API_URL = (leave empty or don't add)
```

#### For API Functions (SMTP variables):

```
SMTP_HOST = smtp.hostinger.com
SMTP_PORT = 587
SMTP_USER = info@modernservices.org.uk
SMTP_PASSWORD = MuFaMod*!
```

**Important:**

- Set **Environment** to: `Production`, `Preview`, and `Development` (select all)
- `VITE_*` variables are used during build time
- `SMTP_*` variables are used at runtime by API functions

## 🚀 Deployment Steps

### Step 1: Verify Root Folder in Vercel

1. Go to **Vercel Dashboard → Your Project → Settings → General**
2. Check **Root Directory**
3. Should be: `.` (empty) or `Modern-Services/`
4. **NOT** `backend-only/`

### Step 2: Set Environment Variables

1. Go to **Settings → Environment Variables**
2. Add all variables listed above
3. Make sure to select all environments (Production, Preview, Development)

### Step 3: Deploy

**Option A: Via Git (Recommended)**

```bash
git add .
git commit -m "Deploy frontend and backend together"
git push
```

**Option B: Via Vercel Dashboard**

- Go to **Deployments**
- Click **Redeploy** on latest deployment
- Or drag & drop the `Modern-Services/` folder

### Step 4: Verify Deployment

After deployment:

1. Visit your Vercel URL: `https://modern-services.vercel.app`
2. Go to Contact page
3. Open browser console (F12)
4. Submit form
5. Should see request to: `https://modern-services.vercel.app/api/send-email` (same domain!)
6. No CORS errors!

## ✅ What Happens

When deployed together:

- **Frontend**: Served from `dist/` folder
- **API Functions**: Available at `/api/send-email` and `/api/health`
- **Same Domain**: Both on `modern-services.vercel.app`
- **No CORS Issues**: Same origin = no CORS needed
- **Automatic**: Frontend code uses `window.location.origin` automatically

## 🔍 How It Works

The `ContactPage.tsx` code:

```typescript
let apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  // Uses same origin automatically
  apiUrl = window.location.origin;
}
```

So if `VITE_API_URL` is empty/not set:

- Frontend calls: `window.location.origin + '/api/send-email'`
- Which becomes: `https://modern-services.vercel.app/api/send-email`
- Same domain = No CORS! ✅

## 📝 Checklist

- [ ] Root folder in Vercel is `Modern-Services/` (not `backend-only/`)
- [ ] All Firebase env vars set in Vercel
- [ ] All SMTP env vars set in Vercel
- [ ] `VITE_API_URL` is empty or not set
- [ ] Deployed successfully
- [ ] Tested contact form - no CORS errors
- [ ] Emails are being sent

---

**That's it!** Once deployed together, everything will work on the same domain with no CORS issues.
