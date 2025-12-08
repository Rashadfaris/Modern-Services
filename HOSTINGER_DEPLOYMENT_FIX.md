# Fixing Contact Form on Hostinger

## ❌ The Problem

After deploying to Hostinger, you're getting:

- **404 error** on `/api/send-email`
- **JSON parse error** (getting HTML 404 page instead of JSON)

**Why:** Hostinger only serves static files. It cannot run serverless functions like `/api/send-email`. When your frontend tries to call the API, Hostinger returns a 404 HTML page.

## ✅ Solutions

### Option 1: Use Vercel Instead (Recommended)

**Best solution** - Deploy everything to Vercel:

- Frontend works ✅
- API functions work ✅
- No manual uploads ✅
- Free hosting ✅

**Steps:**

1. Deploy `Modern-Services/` folder to Vercel
2. Set environment variables in Vercel
3. Done! Everything works automatically

---

### Option 2: Hostinger Frontend + Vercel Backend

Keep frontend on Hostinger, but use Vercel for API:

**Step 1: Deploy Backend to Vercel**

1. Create a new Vercel project
2. Use `backend-only/` folder as root
3. Set environment variables:
   ```
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=587
   SMTP_USER=info@modernservices.org.uk
   SMTP_PASSWORD=MuFaMod*!
   ```
4. Deploy - you'll get a URL like: `https://modern-services-api.vercel.app`

**Step 2: Update Frontend for Hostinger**

Before building for Hostinger, create/update `.env` file:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyD_3FMW0V5KHCOuh5ntZAxW_9-aQOqfUNU
VITE_FIREBASE_AUTH_DOMAIN=modern-services-4675.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=modern-services-4675
VITE_FIREBASE_STORAGE_BUCKET=modern-services-4675.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=243995977354
VITE_FIREBASE_APP_ID=1:243995977354:web:fbbe9964741567e74c6f73
VITE_FIREBASE_MEASUREMENT_ID=G-CD0Q00J8WE

# API URL - Point to your Vercel backend
VITE_API_URL=https://modern-services-api.vercel.app
```

**Step 3: Build and Upload**

```bash
npm run build
```

Then upload everything from `dist/` to Hostinger's `public_html/` folder.

**Step 4: Test**

- Frontend: `https://your-domain.com` (Hostinger)
- API: `https://modern-services-api.vercel.app/api/send-email` (Vercel)
- Contact form should work! ✅

---

### Option 3: Use EmailJS (No Backend Needed)

If you want to keep everything on Hostinger without Vercel:

1. Sign up at https://dashboard.emailjs.com/
2. Create a service and template
3. Update `ContactPage.tsx` to use EmailJS instead of API
4. No backend needed - works entirely on Hostinger

**Note:** This requires code changes to use EmailJS SDK.

---

## 🔍 Current Setup Analysis

**What you have now:**

- Frontend on Hostinger ✅
- API functions don't exist on Hostinger ❌
- Contact form tries to call `/api/send-email` ❌
- Gets 404 HTML page instead of JSON ❌

**What you need:**

- Either move to Vercel (Option 1)
- Or add Vercel backend and point frontend to it (Option 2)
- Or use EmailJS (Option 3)

---

## 📝 Quick Fix (Option 2 - Fastest)

If you want to keep Hostinger frontend:

1. **Deploy backend to Vercel:**

   - Use `backend-only/` folder
   - Get API URL: `https://your-api.vercel.app`

2. **Update frontend `.env`:**

   ```
   VITE_API_URL=https://your-api.vercel.app
   ```

3. **Rebuild:**

   ```bash
   npm run build
   ```

4. **Re-upload to Hostinger:**

   - Upload all files from `dist/` to `public_html/`

5. **Test contact form** - should work! ✅

---

**Recommendation:** Use Option 1 (Vercel for everything) - it's simpler and everything works automatically.
