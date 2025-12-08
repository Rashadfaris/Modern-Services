# Option 2: Hostinger Frontend + Vercel Backend - Step by Step

## 📋 Overview

- **Frontend**: Hostinger (static files)
- **Backend API**: Vercel (serverless functions)
- **Result**: Contact form works! ✅

---

## 🚀 Step 1: Deploy Backend to Vercel

### 1.1 Create New Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository OR
4. Click **"Deploy"** → **"Browse"** and select the `backend-only/` folder

### 1.2 Configure Project

- **Project Name**: `modern-services-api` (or any name)
- **Root Directory**: Leave empty (or set to `backend-only/` if deploying from root)
- **Framework Preset**: Other (or leave as is)

### 1.3 Set Environment Variables

Go to **Settings → Environment Variables** and add:

```
SMTP_HOST = smtp.hostinger.com
SMTP_PORT = 587
SMTP_USER = info@modernservices.org.uk
SMTP_PASSWORD = MuFaMod*!
```

**Important:** Select all environments (Production, Preview, Development)

### 1.4 Deploy

- Click **"Deploy"**
- Wait for deployment to complete
- **Copy your deployment URL** - it will be like: `https://modern-services-api.vercel.app`
- **Save this URL** - you'll need it in Step 2!

### 1.5 Test Backend

Visit: `https://your-api-url.vercel.app/api/health`

Should return:

```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "..."
}
```

✅ If this works, backend is ready!

---

## 🔧 Step 2: Update Frontend Configuration

### 2.1 Create/Update `.env` File

In the `Modern-Services/` folder (main project, not backend-only), create or update `.env`:

```env
# Firebase Configuration (REQUIRED)
VITE_FIREBASE_API_KEY=AIzaSyD_3FMW0V5KHCOuh5ntZAxW_9-aQOqfUNU
VITE_FIREBASE_AUTH_DOMAIN=modern-services-4675.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=modern-services-4675
VITE_FIREBASE_STORAGE_BUCKET=modern-services-4675.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=243995977354
VITE_FIREBASE_APP_ID=1:243995977354:web:fbbe9964741567e74c6f73
VITE_FIREBASE_MEASUREMENT_ID=G-CD0Q00J8WE

# API URL - Point to your Vercel backend
# Replace with your actual Vercel API URL from Step 1.4
VITE_API_URL=https://modern-services-api.vercel.app
```

**Important:** Replace `https://modern-services-api.vercel.app` with your actual Vercel backend URL!

### 2.2 Verify ContactPage.tsx

The code should already be set up to use `VITE_API_URL`. Check that `pages/ContactPage.tsx` has:

```typescript
let apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  apiUrl = window.location.origin;
}
```

This is already correct! ✅

---

## 🏗️ Step 3: Build Frontend

### 3.1 Build

```bash
cd Modern-Services
npm run build
```

This creates the `dist/` folder with all static files.

### 3.2 Verify Build

Check that `dist/` folder contains:

- `index.html`
- `site.webmanifest`
- `assets/` folder (JS and CSS)
- `logo/` folder

---

## 📤 Step 4: Upload to Hostinger

### 4.1 Access Hostinger File Manager

1. Log in to Hostinger
2. Go to **File Manager** or **hPanel**
3. Navigate to `public_html/` folder

### 4.2 Upload Files

**Option A: Upload via File Manager**

1. Delete old files in `public_html/` (or backup first)
2. Upload all files from `dist/` folder to `public_html/`
3. Make sure folder structure is preserved:
   ```
   public_html/
   ├── index.html
   ├── site.webmanifest
   ├── assets/
   └── logo/
   ```

**Option B: Upload via FTP**

1. Use FTP client (FileZilla, WinSCP, etc.)
2. Connect to your Hostinger FTP
3. Upload all files from `dist/` to `public_html/`

### 4.3 Verify File Structure

After upload, `public_html/` should have:

- ✅ `index.html`
- ✅ `site.webmanifest`
- ✅ `assets/` folder
- ✅ `logo/` folder

---

## ✅ Step 5: Test

### 5.1 Test Frontend

1. Visit your domain: `https://your-domain.com`
2. Should load the website ✅

### 5.2 Test Contact Form

1. Go to Contact page
2. Fill out the form
3. Submit
4. **Check browser console (F12)**:
   - Should see request to: `https://your-api-url.vercel.app/api/send-email`
   - Should see success message ✅
   - No CORS errors ✅

### 5.3 Check Email

- Check `info@modernservices.org.uk` inbox
- Should receive the contact form submission ✅

---

## 🔍 Troubleshooting

### Issue: Still getting 404 on `/api/send-email`

**Solution:**

- Check that `VITE_API_URL` in `.env` is correct
- Rebuild frontend: `npm run build`
- Re-upload to Hostinger

### Issue: CORS error

**Solution:**

- Backend CORS is already configured to allow all origins
- Check that backend is deployed correctly
- Test backend directly: `https://your-api-url.vercel.app/api/health`

### Issue: Email not sending

**Solution:**

- Check Vercel environment variables are set correctly
- Check Vercel function logs for errors
- Verify SMTP credentials are correct

### Issue: Frontend not loading

**Solution:**

- Check file structure in `public_html/`
- Make sure `index.html` is in root of `public_html/`
- Check file permissions (should be 644 for files, 755 for folders)

---

## 📝 Checklist

- [ ] Backend deployed to Vercel
- [ ] Backend URL copied and saved
- [ ] Environment variables set in Vercel (SMTP)
- [ ] `.env` file created/updated with `VITE_API_URL`
- [ ] Frontend rebuilt (`npm run build`)
- [ ] Files uploaded to Hostinger `public_html/`
- [ ] Website loads correctly
- [ ] Contact form works
- [ ] Emails are being received

---

## 🎉 Success!

Once all steps are complete:

- ✅ Frontend on Hostinger
- ✅ Backend API on Vercel
- ✅ Contact form working
- ✅ Emails sending correctly

**You're all set!** 🚀
