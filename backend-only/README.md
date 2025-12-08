# Backend API for Modern Services

This folder contains serverless functions for Vercel. **Backend-only deployment** - no frontend, no build output directory needed.

## 📁 Final Correct Folder Structure

```
backend-only/
├── api/
│   ├── send-email.js  (POST - Contact form email handler)
│   └── health.js       (GET - Health check endpoint)
├── package.json
├── vercel.json         (Minimal config - auto-detects /api functions)
└── README.md
```

## 🔍 Root Causes of Vercel Errors

### 1. **"No Output Directory named 'public' found"**

- **Cause**: Vercel was treating this as a frontend project
- **Fix**: Removed outdated `vercel.json` v2 format with `builds`/`routes`. Modern Vercel auto-detects `/api` folder.

### 2. **Functions tab not showing / 404 errors**

- **Cause**: Old `vercel.json` configuration was interfering with auto-detection
- **Fix**: Simplified `vercel.json` to only specify runtime, letting Vercel auto-detect functions.

### 3. **Wrong root directory**

- **Cause**: If deploying from project root, Vercel looks for frontend build
- **Fix**: Deploy `backend-only/` folder as root OR set root directory in Vercel settings.

## 🚀 Deployment Steps

### Option 1: Deploy `backend-only` folder directly (Recommended)

1. **In Vercel Dashboard:**

   - Go to your project settings
   - Set **Root Directory** to `backend-only`
   - OR create a new project and point it to the `backend-only` folder

2. **Using Vercel CLI:**
   ```bash
   cd backend-only
   vercel
   ```

### Option 2: Deploy from project root

1. **In Vercel Dashboard:**

   - Settings → General → Root Directory
   - Set to: `backend-only`

2. **Important**: Make sure `vercel.json` is in the `backend-only` folder, not the project root.

## ⚙️ Environment Variables

Set these in **Vercel Dashboard → Settings → Environment Variables**:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=your_password_here
```

## 📡 API Endpoints

After deployment, your API will be available at:

- **Health Check**: `https://your-project.vercel.app/api/health` (GET)
- **Send Email**: `https://your-project.vercel.app/api/send-email` (POST)

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

## 🌐 Connecting Frontend (Hostinger) to Backend (Vercel)

### 1. Update Frontend API URL

In your frontend code (hosted on Hostinger), update the API base URL:

```javascript
// Example: In your frontend contact form
const API_BASE_URL = "https://your-project.vercel.app";

// Send email
const response = await fetch(`${API_BASE_URL}/api/send-email`, {
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
```

### 2. CORS Configuration

The backend is configured to allow requests from:

- `https://modernservices.org.uk`
- `https://www.modernservices.org.uk`
- `http://localhost:5173` (development)
- `http://localhost:3000` (development)

**To add your Hostinger domain:**
Edit `api/send-email.js` and `api/health.js`, add your domain to the `allowedOrigins` array:

```javascript
const allowedOrigins = [
  "https://modernservices.org.uk",
  "https://www.modernservices.org.uk",
  "https://your-hostinger-domain.com", // Add your domain here
  "http://localhost:5173",
  "http://localhost:3000",
];
```

### 3. Testing CORS

Test from your frontend:

```javascript
// Health check
fetch("https://your-project.vercel.app/api/health")
  .then((res) => res.json())
  .then((data) => console.log(data));

// Send email
fetch("https://your-project.vercel.app/api/send-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Test",
    email: "test@example.com",
    message: "Test message",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

## ✅ Verification Checklist

After deployment, verify:

- [ ] `/api/health` returns `{ status: "ok", message: "Backend is running" }`
- [ ] `/api/send-email` accepts POST requests
- [ ] Functions tab appears in Vercel dashboard
- [ ] No "public" directory errors
- [ ] CORS works from your Hostinger frontend
- [ ] Environment variables are set correctly

## 🐛 Troubleshooting

### Functions not appearing

- Check that `vercel.json` is in `backend-only/` folder
- Verify root directory is set to `backend-only` in Vercel settings
- Remove any `.vercelignore` that might exclude `api/` folder

### 404 errors

- Ensure functions are in `/api/` folder (not `/api` at root)
- Check function names match the URL path (`/api/health.js` → `/api/health`)

### CORS errors

- Verify your frontend domain is in `allowedOrigins` array
- Check browser console for specific CORS error
- Ensure `Access-Control-Allow-Origin` header is set correctly

### Email sending fails

- Verify SMTP environment variables are set
- Check Vercel function logs for detailed errors
- Test SMTP credentials separately

## 📝 Notes

- **No build step required** - These are serverless functions
- **No output directory** - Functions are deployed directly from `/api` folder
- **ES Modules** - Uses `export default` (Node.js 18+)
- **Runtime**: `@vercel/node` (auto-detected)
