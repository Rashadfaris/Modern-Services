# 🚀 Fly.io Deployment Guide for Backend

## ✅ Backend Readiness: **READY FOR DEPLOYMENT** ✅

Your `backend-only` folder is **fully configured** for Fly.io deployment.

## 📁 Files Created for Fly.io

```
backend-only/
├── fly.toml              ✅ Fly.io configuration
├── Dockerfile            ✅ Docker configuration (optional)
├── .dockerignore          ✅ Docker ignore rules
└── FLY_DEPLOYMENT.md     ✅ This guide
```

## ✅ Verification Checklist

- [x] **Express server exists** (`index.js`)
- [x] **Start script configured** (`npm start` in package.json)
- [x] **API routes set up** (`/api/health` and `/api/send-email`)
- [x] **Port configuration** (uses `process.env.PORT`)
- [x] **No frontend dependencies** (only backend packages)
- [x] **No build step required** (pure Node.js server)
- [x] **CORS configured** (for Hostinger frontend)
- [x] **Health check endpoint** (for Fly.io monitoring)

## ⚙️ Environment Variables Required

Set these in **Fly.io Dashboard** or via CLI:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=your_actual_password_here
```

**Note:** `PORT` is automatically set by Fly.io (no need to add it).

## 🚀 Fly.io Deployment Steps

### Prerequisites

1. **Install Fly.io CLI:**

   ```bash
   # Windows (PowerShell)
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

   # macOS/Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly.io:**
   ```bash
   fly auth login
   ```

### Step 1: Initialize Fly.io App

Navigate to your backend directory:

```bash
cd backend-only
```

Initialize Fly.io (this will create/update `fly.toml`):

```bash
fly launch
```

**During initialization:**

- App name: `modern-services-backend` (or your preferred name)
- Region: Choose closest to your users (e.g., `lhr` for London)
- Use existing `fly.toml`: **Yes** (we already created it)
- Overwrite Dockerfile: **Yes** (if you want to use our Dockerfile)

### Step 2: Set Environment Variables

Set SMTP credentials:

```bash
fly secrets set SMTP_HOST=smtp.hostinger.com
fly secrets set SMTP_PORT=587
fly secrets set SMTP_USER=info@modernservices.org.uk
fly secrets set SMTP_PASSWORD=your_actual_password_here
```

**Or set all at once:**

```bash
fly secrets set SMTP_HOST=smtp.hostinger.com SMTP_PORT=587 SMTP_USER=info@modernservices.org.uk SMTP_PASSWORD=your_password
```

### Step 3: Deploy

Deploy your application:

```bash
fly deploy
```

Fly.io will:

- Build your Docker image (or use buildpack)
- Push to Fly.io registry
- Deploy to your selected region
- Assign a public URL

### Step 4: Get Your Backend URL

After deployment, get your app URL:

```bash
fly status
```

Or check the Fly.io dashboard. Your backend will be available at:
`https://modern-services-backend.fly.dev`

### Step 5: Open Your App

```bash
fly open
```

This will open your app in the browser.

## 📡 API Endpoints

After deployment, your API will be available at:

- **Health Check:** `https://your-app.fly.dev/api/health`
- **Send Email:** `https://your-app.fly.dev/api/send-email`

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

Update your frontend to call the Fly.io backend:

```javascript
// Replace your API URL with Fly.io URL
const API_BASE_URL = "https://your-app.fly.dev";

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

- [ ] App shows "running" status: `fly status`
- [ ] `/api/health` returns `{ status: "ok", message: "Backend is running" }`
- [ ] `/api/send-email` accepts POST requests
- [ ] CORS works from your Hostinger frontend
- [ ] Environment variables are set correctly
- [ ] Email sending works (check Fly.io logs)

## 🔍 Useful Fly.io Commands

```bash
# Check app status
fly status

# View logs
fly logs

# SSH into running container
fly ssh console

# List all apps
fly apps list

# Open app in browser
fly open

# Scale app
fly scale count 1

# View secrets (names only, not values)
fly secrets list

# Set secret
fly secrets set KEY=value

# Remove secret
fly secrets unset KEY

# Restart app
fly apps restart <app-name>

# View app info
fly info
```

## 🔍 Troubleshooting

### App won't start

1. **Check logs:**

   ```bash
   fly logs
   ```

   Look for error messages

2. **Verify Dockerfile:**

   - Ensure `Dockerfile` exists in `backend-only/` folder
   - Check that `package.json` has `start` script

3. **Check health endpoint:**
   - Verify `/api/health` is accessible
   - Fly.io uses this for health checks

### Environment variables not working

1. **Verify secrets are set:**

   ```bash
   fly secrets list
   ```

2. **Check variable names:**

   - Must match exactly: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`

3. **Redeploy after setting secrets:**
   ```bash
   fly deploy
   ```

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
   ```bash
   fly deploy
   ```

### Email sending fails

1. **Check Fly.io logs:**

   ```bash
   fly logs
   ```

   View logs for detailed error messages

2. **Verify SMTP credentials:**

   - Double-check `SMTP_PASSWORD` is correct
   - Ensure email account is active

3. **Test SMTP connection:**
   - Check Fly.io logs for SMTP connection errors

### Port binding errors

If you see port binding errors:

1. **Verify PORT usage:**

   - Your `index.js` should use `process.env.PORT || 3000`
   - Fly.io sets `PORT` automatically

2. **Check fly.toml:**
   - `internal_port` should match your app's port (3000)

## 📝 Important Notes

- **App Name:** Set in `fly.toml` (must be globally unique)
- **Region:** Choose closest to your users in `fly.toml`
- **Port:** Fly.io auto-assigns via `PORT` env variable
- **Health Checks:** Configured in `fly.toml` to ping `/api/health`
- **Auto-scaling:** Machines auto-stop/start based on traffic (free tier)
- **Secrets:** Use `fly secrets set` (not regular env vars for sensitive data)

## 🆚 Fly.io vs Other Platforms

| Feature            | Fly.io            | Render             | Railway            | Vercel               |
| ------------------ | ----------------- | ------------------ | ------------------ | -------------------- |
| **Type**           | Docker containers | Traditional server | Traditional server | Serverless functions |
| **Root Directory** | `backend-only/`   | `backend-only/`    | `backend-only/`    | `backend-only/`      |
| **Config File**    | `fly.toml`        | Dashboard only     | Dashboard/CLI      | `vercel.json`        |
| **Dockerfile**     | Recommended       | Optional           | Optional           | Not used             |
| **Free Tier**      | 3 shared VMs      | Sleeps after 15min | No sleep           | No sleep             |
| **Regions**        | Global (many)     | Limited            | Limited            | Global (many)        |
| **Scaling**        | Auto-scaling      | Manual             | Manual             | Auto (serverless)    |

## 💰 Fly.io Free Tier

- **3 shared-cpu-1x VMs** (256MB RAM each)
- **3GB persistent volume storage**
- **160GB outbound data transfer**
- **No sleep** (machines auto-stop/start)

## 📞 Support

If you encounter issues:

1. Check Fly.io deployment logs: `fly logs`
2. Verify secrets are set: `fly secrets list`
3. Test endpoints with `curl` or Postman
4. Check Fly.io status page: [status.fly.io](https://status.fly.io)
5. Review Fly.io documentation: [fly.io/docs](https://fly.io/docs)

## 🎯 Quick Deploy Commands

```bash
# 1. Login
fly auth login

# 2. Navigate to backend
cd backend-only

# 3. Launch (first time only)
fly launch

# 4. Set secrets
fly secrets set SMTP_HOST=smtp.hostinger.com SMTP_PORT=587 SMTP_USER=info@modernservices.org.uk SMTP_PASSWORD=your_password

# 5. Deploy
fly deploy

# 6. Open app
fly open
```

That's it! Your backend is now deployed on Fly.io! 🚀
