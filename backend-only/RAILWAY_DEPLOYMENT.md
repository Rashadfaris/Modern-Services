# 🚂 Railway Deployment Guide for Backend

## 📁 Root Directory

**Root Directory:** `backend-only/`

When deploying to Railway, set the root directory to `backend-only/` in Railway settings.

## ⚙️ Environment Variables

Add these environment variables in **Railway Dashboard → Variables**:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=your_actual_password_here
PORT=3000
```

### Environment Variables Explained:

| Variable        | Value                        | Description                                            |
| --------------- | ---------------------------- | ------------------------------------------------------ |
| `SMTP_HOST`     | `smtp.hostinger.com`         | Hostinger SMTP server                                  |
| `SMTP_PORT`     | `587`                        | SMTP port (587 for STARTTLS, 465 for SSL)              |
| `SMTP_USER`     | `info@modernservices.org.uk` | Your email address                                     |
| `SMTP_PASSWORD` | `your_password`              | Your email password                                    |
| `PORT`          | `3000`                       | Server port (Railway auto-assigns, but you can set it) |

**Note:** Railway automatically provides a `PORT` environment variable, but you can override it if needed.

## 🚀 Deployment Steps

### Step 1: Connect Repository to Railway

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository

### Step 2: Configure Service

1. After connecting, Railway will detect your project
2. Click on the service
3. Go to **Settings** tab
4. Set **Root Directory** to: `backend-only`
5. Railway will auto-detect `package.json` and `index.js`

### Step 3: Set Environment Variables

1. In Railway dashboard, go to **Variables** tab
2. Click **"New Variable"**
3. Add each environment variable:
   - `SMTP_HOST` = `smtp.hostinger.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `info@modernservices.org.uk`
   - `SMTP_PASSWORD` = `your_actual_password`
   - `PORT` = `3000` (optional, Railway auto-assigns)

### Step 4: Deploy

Railway will automatically:

- Install dependencies (`npm install`)
- Start the server (`npm start`)
- Assign a public URL

### Step 5: Get Your Backend URL

1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"** to get a public URL
3. Your backend will be available at: `https://your-project.up.railway.app`

## 📡 API Endpoints

After deployment, your API will be available at:

- **Health Check:** `https://your-project.up.railway.app/api/health`
- **Send Email:** `https://your-project.up.railway.app/api/send-email`

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

Update your frontend to call the Railway backend:

```javascript
// Replace your API URL with Railway URL
const API_BASE_URL = "https://your-project.up.railway.app";

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

- [ ] Service is running (green status in Railway)
- [ ] `/api/health` returns `{ status: "ok", message: "Backend is running" }`
- [ ] `/api/send-email` accepts POST requests
- [ ] CORS works from your Hostinger frontend
- [ ] Environment variables are set correctly
- [ ] Email sending works (check Railway logs)

## 🔍 Troubleshooting

### Service won't start

1. **Check Railway logs:**

   - Go to **Deployments** → Click on latest deployment → View logs
   - Look for error messages

2. **Verify root directory:**

   - Settings → Root Directory should be `backend-only`

3. **Check package.json:**
   - Ensure `"start": "node index.js"` script exists
   - Verify `index.js` exists in `backend-only/` folder

### Environment variables not working

1. **Verify variables are set:**

   - Go to **Variables** tab
   - Ensure all SMTP variables are present

2. **Check variable names:**

   - Must match exactly: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`

3. **Redeploy after adding variables:**
   - Railway auto-redeploys when variables change
   - Wait for deployment to complete

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
   - Railway will auto-deploy

### Email sending fails

1. **Check Railway logs:**

   - View function logs for detailed error messages

2. **Verify SMTP credentials:**

   - Double-check `SMTP_PASSWORD` is correct
   - Ensure email account is active

3. **Test SMTP connection:**
   - Check Railway logs for SMTP connection errors

## 📝 Important Notes

- **Root Directory:** Must be `backend-only/` (not project root)
- **Port:** Railway auto-assigns a port via `PORT` env variable
- **Auto-deploy:** Railway auto-deploys on Git push
- **Free Tier:** Railway free tier is generous for backend APIs
- **Custom Domain:** You can add a custom domain in Railway settings

## 🆚 Railway vs Vercel

| Feature            | Railway                | Vercel                 |
| ------------------ | ---------------------- | ---------------------- |
| **Type**           | Traditional server     | Serverless functions   |
| **Root Directory** | `backend-only/`        | `backend-only/`        |
| **Start Command**  | `npm start`            | Auto-detected          |
| **Port**           | Auto-assigned          | N/A (serverless)       |
| **File Structure** | Needs `index.js`       | Needs `/api/*.js`      |
| **Best For**       | Long-running processes | Event-driven functions |

## 📞 Support

If you encounter issues:

1. Check Railway deployment logs
2. Verify environment variables are set
3. Test endpoints with `curl` or Postman
4. Check Railway status page for outages
5. Review Railway documentation: [docs.railway.app](https://docs.railway.app)
