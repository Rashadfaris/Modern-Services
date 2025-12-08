# 🚀 Vercel Backend Deployment Guide

## ✅ What Was Fixed

### Root Causes Identified:

1. **Outdated `vercel.json` format**

   - ❌ **Before**: Used v2 format with `builds` and `routes` (deprecated)
   - ✅ **After**: Minimal config that lets Vercel auto-detect `/api` functions

2. **Vercel treating backend as frontend**

   - ❌ **Before**: Looking for `public` output directory
   - ✅ **After**: Backend-only config, no output directory needed

3. **CORS configuration**
   - ❌ **Before**: Wildcard or dynamic origin (less secure)
   - ✅ **After**: Specific allowed origins including your Hostinger domain

## 📁 Final Correct Structure

```
backend-only/
├── api/
│   ├── send-email.js    ✅ POST handler with CORS
│   └── health.js         ✅ GET handler with CORS
├── package.json          ✅ ES modules, nodemailer dependency
├── vercel.json           ✅ Minimal config (runtime only)
└── README.md             ✅ Complete documentation
```

## 🔧 Key Changes Made

### 1. `vercel.json` - Simplified

```json
{
  "functions": {
    "api/**/*.js": {
      "runtime": "@vercel/node"
    }
  }
}
```

- Removed deprecated `builds` and `routes`
- Vercel now auto-detects functions in `/api` folder
- No output directory configuration needed

### 2. CORS Headers - Specific Origins

Both `send-email.js` and `health.js` now use:

```javascript
const allowedOrigins = [
  "https://modernservices.org.uk",
  "https://www.modernservices.org.uk",
  "http://localhost:5173",
  "http://localhost:3000",
];
```

### 3. Health Endpoint - Correct Message

Changed from `"Server is running"` to `"Backend is running"` to match your requirement.

## 🎯 Deployment Instructions

### Step 1: Set Root Directory in Vercel

**Option A: Via Dashboard**

1. Go to Vercel Dashboard → Your Project → Settings
2. General → Root Directory
3. Set to: `backend-only`
4. Save

**Option B: Via CLI**

```bash
cd backend-only
vercel
```

### Step 2: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=your_actual_password
```

### Step 3: Deploy

```bash
vercel --prod
```

Or push to your connected Git branch.

## 🌐 Frontend Integration (Hostinger)

### Update Your Frontend Code

Replace your API URL with the Vercel backend URL:

```javascript
// Example: Contact form submission
const submitContactForm = async (formData) => {
  try {
    const response = await fetch(
      "https://your-project.vercel.app/api/send-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log("Email sent successfully!");
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};
```

### Add Your Hostinger Domain to CORS

If your Hostinger domain is different, edit both API files:

1. Open `api/send-email.js`
2. Open `api/health.js`
3. Add your domain to `allowedOrigins`:
   ```javascript
   const allowedOrigins = [
     "https://modernservices.org.uk",
     "https://www.modernservices.org.uk",
     "https://your-hostinger-domain.com", // ← Add here
     "http://localhost:5173",
     "http://localhost:3000",
   ];
   ```

## ✅ Verification

After deployment, test:

1. **Health Check:**

   ```bash
   curl https://your-project.vercel.app/api/health
   ```

   Should return:

   ```json
   {
     "status": "ok",
     "message": "Backend is running",
     "timestamp": "..."
   }
   ```

2. **Send Email (from browser console on your frontend):**
   ```javascript
   fetch("https://your-project.vercel.app/api/send-email", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       name: "Test User",
       email: "test@example.com",
       message: "Test message",
     }),
   })
     .then((r) => r.json())
     .then(console.log);
   ```

## 🎉 Expected Results

After fixing:

- ✅ No "public directory" errors
- ✅ Functions tab appears in Vercel dashboard
- ✅ `/api/health` returns correct response
- ✅ `/api/send-email` accepts POST requests
- ✅ CORS works from your Hostinger frontend
- ✅ No 404 errors
- ✅ No manifest/fetch 401 errors

## 📞 Support

If you still encounter issues:

1. Check Vercel function logs: Dashboard → Your Project → Functions
2. Verify root directory is set correctly
3. Ensure environment variables are set
4. Check browser console for CORS errors
5. Verify your frontend domain is in `allowedOrigins`
