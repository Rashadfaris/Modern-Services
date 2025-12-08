# Quick Setup - Option 2

## 🎯 What You Need to Do

### 1️⃣ Deploy Backend to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com) → New Project
2. Upload `backend-only/` folder
3. Set environment variables:
   ```
   SMTP_HOST = smtp.hostinger.com
   SMTP_PORT = 587
   SMTP_USER = info@modernservices.org.uk
   SMTP_PASSWORD = MuFaMod*!
   ```
4. Deploy → **Copy the URL** (e.g., `https://modern-services-api.vercel.app`)

### 2️⃣ Update Frontend .env (2 minutes)

Create `.env` in `Modern-Services/` folder:

```env
VITE_FIREBASE_API_KEY=AIzaSyD_3FMW0V5KHCOuh5ntZAxW_9-aQOqfUNU
VITE_FIREBASE_AUTH_DOMAIN=modern-services-4675.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=modern-services-4675
VITE_FIREBASE_STORAGE_BUCKET=modern-services-4675.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=243995977354
VITE_FIREBASE_APP_ID=1:243995977354:web:fbbe9964741567e74c6f73
VITE_FIREBASE_MEASUREMENT_ID=G-CD0Q00J8WE

# ⬇️ REPLACE THIS WITH YOUR VERCEL BACKEND URL ⬇️
VITE_API_URL=https://your-backend-url.vercel.app
```

### 3️⃣ Build & Upload (3 minutes)

```bash
npm run build
```

Then upload everything from `dist/` to Hostinger `public_html/`

---

**Total time: ~10 minutes** ⏱️

See `OPTION_2_STEP_BY_STEP.md` for detailed instructions.
