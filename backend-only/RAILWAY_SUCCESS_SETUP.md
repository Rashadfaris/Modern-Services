# ✅ Railway Deployment Success - Next Steps

## 🎉 Your Backend URL

**Backend API URL:** `https://modern-services-backend.up.railway.app`

## ✅ Verify Deployment

### 1. Check Railway Dashboard

1. Go to: https://railway.com/project/f5d3a469-cb9a-45d6-8aa0-803979dc85fe
2. Check if service is **"Active"** and **"Deployed"**
3. View **Logs** to see if server started successfully
4. Look for: `🚀 Server running on port...`

### 2. Test Endpoints

**Health Check:**
```
https://modern-services-backend.up.railway.app/api/health
```

**Root Endpoint:**
```
https://modern-services-backend.up.railway.app/
```

**Send Email:**
```
POST https://modern-services-backend.up.railway.app/api/send-email
```

## ⚙️ Important: Set Root Directory in Railway

If endpoints return 404, you need to set the root directory:

1. Go to Railway Dashboard
2. Select your service
3. Go to **Settings** tab
4. Find **Root Directory**
5. Set to: `backend-only`
6. Save and redeploy

## 🌐 Frontend Setup

### Update Your React Frontend

Add this to your `.env` file (in your frontend project root):

```env
REACT_APP_API_URL=https://modern-services-backend.up.railway.app
```

### Use in Your Code

```javascript
// In your frontend code
const API_URL = process.env.REACT_APP_API_URL || 'https://modern-services-backend.up.railway.app';

// Health check
fetch(`${API_URL}/api/health`)
  .then(res => res.json())
  .then(data => console.log(data));

// Send email
fetch(`${API_URL}/api/send-email`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
  }),
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🔒 CORS Configuration

Your backend is configured to allow requests from:
- `https://modernservices.org.uk`
- `https://www.modernservices.org.uk`
- `http://localhost:5173` (development)
- `http://localhost:3000` (development)

**If your frontend is on a different domain**, update `index.js`:

```javascript
app.use(cors({
  origin: [
    'https://modernservices.org.uk',
    'https://www.modernservices.org.uk',
    'https://your-hostinger-domain.com',  // Add your domain here
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  credentials: true,
}));
```

Then redeploy to Railway.

## ✅ Environment Variables Checklist

Make sure these are set in Railway Dashboard:

- [ ] `SMTP_HOST=smtp.hostinger.com`
- [ ] `SMTP_PORT=587`
- [ ] `SMTP_USER=info@modernservices.org.uk`
- [ ] `SMTP_PASSWORD=your_password`

**To set via CLI:**
```powershell
railway variables --set "SMTP_HOST=smtp.hostinger.com"
railway variables --set "SMTP_PORT=587"
railway variables --set "SMTP_USER=info@modernservices.org.uk"
railway variables --set "SMTP_PASSWORD=your_password"
```

## 🔍 Troubleshooting

### 404 Errors

1. **Check Root Directory:**
   - Railway Dashboard → Service → Settings → Root Directory
   - Should be: `backend-only`

2. **Check Logs:**
   ```powershell
   railway logs
   ```
   Look for errors or "Server running" message

3. **Redeploy:**
   ```powershell
   railway up
   ```

### CORS Errors

1. **Add your frontend domain** to CORS in `index.js`
2. **Redeploy** after changes
3. **Check browser console** for specific CORS error

### Email Not Sending

1. **Verify SMTP variables** are set correctly
2. **Check Railway logs** for SMTP errors
3. **Test SMTP credentials** separately

## 📝 Quick Commands

```powershell
# View logs
railway logs

# Check status
railway status

# Redeploy
railway up

# Open dashboard
railway open

# View variables
railway variables
```

## 🎯 Your API Endpoints

- **Base URL:** `https://modern-services-backend.up.railway.app`
- **Health:** `https://modern-services-backend.up.railway.app/api/health`
- **Send Email:** `https://modern-services-backend.up.railway.app/api/send-email`

## ✅ Next Steps

1. ✅ Verify deployment in Railway dashboard
2. ✅ Set root directory to `backend-only` (if not set)
3. ✅ Set SMTP environment variables
4. ✅ Update frontend `.env` with `REACT_APP_API_URL`
5. ✅ Test endpoints
6. ✅ Update frontend code to use the API URL

Congratulations! Your backend is deployed on Railway! 🚀

