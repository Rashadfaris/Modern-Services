# 🌐 Hostinger Frontend Setup with Railway Backend

## ✅ Backend is Ready!

Your Railway backend is deployed and running at:

```
https://modern-services-backend-production.up.railway.app
```

## 📝 Step 1: Update Frontend Environment Variables

### On Hostinger (Production)

1. **Access your Hostinger hosting** (via File Manager or FTP)
2. **Find your frontend `.env` file** (usually in the root of your React app)
3. **Add or update:**
   ```env
   REACT_APP_API_URL=https://modern-services-backend-production.up.railway.app
   ```

### If using Vite (instead of Create React App)

Use:

```env
VITE_API_URL=https://modern-services-backend-production.up.railway.app
```

## 🔒 Step 2: Verify CORS Configuration

Your backend currently allows:

- ✅ `https://modernservices.org.uk`
- ✅ `https://www.modernservices.org.uk`
- ✅ `http://localhost:5173` (development)
- ✅ `http://localhost:3000` (development)

### If Your Hostinger Domain is Different

If your Hostinger site uses a different domain (not `modernservices.org.uk`), you need to:

1. **Update `backend-only/index.js`** - Add your Hostinger domain:

   ```javascript
   app.use(
     cors({
       origin: [
         "https://modernservices.org.uk",
         "https://www.modernservices.org.uk",
         "https://your-hostinger-domain.com", // ← Add your actual domain here
         "http://localhost:5173",
         "http://localhost:3000",
       ],
       credentials: true,
     })
   );
   ```

2. **Redeploy to Railway:**
   ```powershell
   railway up
   ```

## 💻 Step 3: Update Frontend Code

### In Your Contact Form Component

Make sure you're using the environment variable:

```javascript
// Get API URL from environment
const API_URL =
  process.env.REACT_APP_API_URL ||
  process.env.VITE_API_URL ||
  "https://modern-services-backend-production.up.railway.app";

// Send email function
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${API_URL}/api/send-email`, {
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
    });

    const data = await response.json();

    if (data.success) {
      alert("Email sent successfully!");
      // Reset form
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send email. Please try again.");
  }
};
```

## 🧪 Step 4: Test the Connection

### Test from Browser Console

1. **Open your Hostinger site** in browser
2. **Open Developer Console** (F12)
3. **Run this test:**
   ```javascript
   fetch("https://modern-services-backend-production.up.railway.app/api/health")
     .then((res) => res.json())
     .then((data) => console.log("Backend is working!", data))
     .catch((err) => console.error("Error:", err));
   ```

### Expected Response:

```json
{
  "status": "ok",
  "message": "Backend is running",
  "timestamp": "..."
}
```

## ✅ Step 5: Deploy Updated Frontend

After updating `.env` and code:

1. **Rebuild your frontend** (if needed):

   ```bash
   npm run build
   ```

2. **Upload to Hostinger:**

   - Upload the `dist/` or `build/` folder contents
   - Make sure `.env` file is included (or set via Hostinger dashboard)

3. **Clear browser cache** and test

## 🔍 Troubleshooting

### CORS Errors

**Error:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution:**

1. Add your Hostinger domain to CORS in `backend-only/index.js`
2. Redeploy: `railway up`
3. Wait 1-2 minutes for deployment
4. Test again

### 404 Errors

**Error:** `404 Not Found` when calling API

**Solution:**

1. Verify the API URL is correct in `.env`
2. Check Railway logs: `railway logs`
3. Test health endpoint directly in browser

### Network Errors

**Error:** `Failed to fetch` or `Network error`

**Solution:**

1. Check if Railway backend is running: `railway status`
2. Verify domain is correct
3. Check browser console for detailed error

### Email Not Sending

**Error:** Email endpoint returns error

**Solution:**

1. Check Railway logs: `railway logs`
2. Verify SMTP variables are set: `railway variables`
3. Test SMTP credentials separately

## 📋 Quick Checklist

- [ ] Updated `.env` file on Hostinger with Railway URL
- [ ] Added Hostinger domain to CORS (if different from modernservices.org.uk)
- [ ] Updated frontend code to use `REACT_APP_API_URL` or `VITE_API_URL`
- [ ] Rebuilt frontend (if needed)
- [ ] Uploaded to Hostinger
- [ ] Tested health endpoint from browser console
- [ ] Tested email sending from contact form

## 🎯 Summary

**What You Need to Do:**

1. ✅ **Backend is ready** - Railway is deployed
2. ⏳ **Update Hostinger `.env`** - Add `REACT_APP_API_URL`
3. ⏳ **Add domain to CORS** - If your Hostinger domain is different
4. ⏳ **Redeploy backend** - If you updated CORS
5. ⏳ **Update frontend code** - Use the environment variable
6. ⏳ **Rebuild & upload** - Deploy updated frontend to Hostinger
7. ⏳ **Test** - Try the contact form

## 🚀 You're Almost There!

Once you:

- Update the `.env` file on Hostinger
- Add your domain to CORS (if needed)
- Redeploy the backend (if CORS was updated)

**Everything should work!** Your Hostinger frontend will be able to send emails through your Railway backend.

Need help with any specific step? Let me know! 🎉
