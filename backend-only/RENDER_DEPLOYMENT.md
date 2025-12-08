# 🎨 Render Deployment Guide for Backend

## ✅ Analysis Results

### Backend Readiness: **READY FOR DEPLOYMENT** ✅

Your `backend-only` folder is **fully ready** for Render deployment. Here's the analysis:

## 📁 Current Folder Structure

```
backend-only/
├── api/
│   ├── health.js          ✅ GET endpoint handler
│   └── send-email.js      ✅ POST endpoint handler
├── index.js                ✅ Express server (main entry point)
├── package.json            ✅ Dependencies & start script
├── .gitignore              ✅ Created (ignores node_modules, .env, etc.)
└── vercel.json             ⚠️  (Not needed for Render, but harmless)
```

## ✅ Verification Checklist

- [x] **Express server exists** (`index.js`)
- [x] **Start script configured** (`npm start` in package.json)
- [x] **API routes set up** (`/api/health` and `/api/send-email`)
- [x] **No frontend dependencies** (only backend packages)
- [x] **No build step required** (pure Node.js server)
- [x] **No public output needed** (backend-only)
- [x] **Environment variables used** (SMTP config from env)
- [x] **Port configuration** (uses `process.env.PORT`)
- [x] **CORS configured** (for Hostinger frontend)

## ⚙️ Environment Variables Required

Set these in **Render Dashboard → Environment**:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=your_actual_password_here
```

**Note:** `PORT` is automatically set by Render (no need to add it).

## 🚀 Render Deployment Steps

### Step 1: Create New Web Service

1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Select your repository

### Step 2: Configure Service

**Basic Settings:**

- **Name:** `modern-services-backend` (or your preferred name)
- **Environment:** `Node`
- **Region:** Choose closest to your users
- **Branch:** `main` (or your default branch)

**Build & Deploy:**

- **Root Directory:** `backend-only`
- **Build Command:** (leave empty - no build needed)
- **Start Command:** `npm start` (auto-detected from package.json)

### Step 3: Set Environment Variables

1. Scroll down to **"Environment Variables"** section
2. Click **"Add Environment Variable"**
3. Add each variable:
   - `SMTP_HOST` = `smtp.hostinger.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `info@modernservices.org.uk`
   - `SMTP_PASSWORD` = `your_actual_password`

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will:
   - Clone your repository
   - Navigate to `backend-only/` directory
   - Run `npm install`
   - Run `npm start`
   - Assign a public URL

### Step 5: Get Your Backend URL

After deployment, Render will provide a URL like:
`https://modern-services-backend.onrender.com`

## 📡 API Endpoints

After deployment, your API will be available at:

- **Health Check:** `https://your-service.onrender.com/api/health`
- **Send Email:** `https://your-service.onrender.com/api/send-email`

### Health Endpoint Response:

```json
{
  "status": "ok",
  "message": "Backend is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Send Email Endpoint:

**Request:**

```json
POST /api/send-email
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+44 123 456 7890",
  "message": "Hello, I need help with..."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "..."
}
```

## 🌐 Frontend Integration (Hostinger)

Update your frontend to call the Render backend:

```javascript
// Replace your API URL with Render URL
const API_BASE_URL = "https://your-service.onrender.com";

// Health check
fetch(`${API_BASE_URL}/api/health`)
  .then((res) => res.json())
  .then((data) => console.log(data));

// Send email
fetch(`${API_BASE_URL}/api/send-email`, {
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
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

## ✅ Verification Checklist

After deployment:

- [ ] Service shows "Live" status in Render dashboard
- [ ] `/api/health` returns `{ status: "ok", message: "Backend is running" }`
- [ ] `/api/send-email` accepts POST requests
- [ ] CORS works from your Hostinger frontend
- [ ] Environment variables are set correctly
- [ ] Email sending works (check Render logs)

## 🔍 Troubleshooting

### Service won't start

1. **Check Render logs:**

   - Go to **Logs** tab in Render dashboard
   - Look for error messages

2. **Verify root directory:**

   - Settings → Root Directory should be `backend-only`

3. **Check package.json:**
   - Ensure `"start": "node index.js"` script exists
   - Verify `index.js` exists in `backend-only/` folder

### Environment variables not working

1. **Verify variables are set:**

   - Go to **Environment** tab
   - Ensure all SMTP variables are present

2. **Check variable names:**

   - Must match exactly: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`

3. **Redeploy after adding variables:**
   - Render auto-redeploys when variables change
   - Or manually trigger: **Manual Deploy** → **Deploy latest commit**

### CORS errors from frontend

1. **Check allowed origins:**

   - Edit `index.js` in `backend-only/` folder
   - Add your Hostinger domain to `cors` configuration:

   ```javascript
   app.use(
     cors({
       origin: [
         "https://modernservices.org.uk",
         "https://www.modernservices.org.uk",
         "https://your-hostinger-domain.com", // Add here
         "http://localhost:5173",
         "http://localhost:3000",
       ],
       credentials: true,
     })
   );
   ```

2. **Redeploy after changes:**
   - Push changes to GitHub
   - Render will auto-deploy

### Email sending fails

1. **Check Render logs:**

   - View logs for detailed error messages

2. **Verify SMTP credentials:**

   - Double-check `SMTP_PASSWORD` is correct
   - Ensure email account is active

3. **Test SMTP connection:**
   - Check Render logs for SMTP connection errors

### Service goes to sleep (Free Tier)

Render free tier services sleep after 15 minutes of inactivity. To prevent this:

1. **Upgrade to paid plan** (starts at $7/month)
2. **Use a ping service** (like UptimeRobot) to ping `/api/health` every 10 minutes
3. **Accept sleep delays** (first request after sleep takes ~30 seconds)

## 📝 Important Notes

- **Root Directory:** Must be `backend-only/` (not project root)
- **Build Command:** Leave empty (no build needed)
- **Start Command:** `npm start` (auto-detected)
- **Port:** Render auto-assigns via `PORT` env variable
- **Auto-deploy:** Render auto-deploys on Git push to connected branch
- **Free Tier:** Services sleep after 15 min inactivity

## 🆚 Render vs Railway vs Vercel

| Feature            | Render             | Railway            | Vercel               |
| ------------------ | ------------------ | ------------------ | -------------------- |
| **Type**           | Traditional server | Traditional server | Serverless functions |
| **Root Directory** | `backend-only/`    | `backend-only/`    | `backend-only/`      |
| **Start Command**  | `npm start`        | `npm start`        | Auto-detected        |
| **Port**           | Auto-assigned      | Auto-assigned      | N/A (serverless)     |
| **File Structure** | Needs `index.js`   | Needs `index.js`   | Needs `/api/*.js`    |
| **Free Tier**      | Sleeps after 15min | No sleep           | No sleep             |

## 📞 Support

If you encounter issues:

1. Check Render deployment logs
2. Verify environment variables are set
3. Test endpoints with `curl` or Postman
4. Check Render status page for outages
5. Review Render documentation: [render.com/docs](https://render.com/docs)
