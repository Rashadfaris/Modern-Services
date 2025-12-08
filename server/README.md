# Express Backend Server

This is the Express backend server for handling contact form submissions using Nodemailer.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm run install:server
```

Or manually:

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```env
# SMTP Configuration (Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=MuFaMod*!

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 3. Start the Server

**Development mode (with auto-reload):**

```bash
npm run server:dev
```

**Production mode:**

```bash
npm run server
```

The server will start on `http://localhost:3001`

## 📧 API Endpoints

### POST `/api/send-email`

Send a contact form email.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+44 123 456 7890",
  "message": "Hello, I'm interested in your services."
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "message-id-here"
}
```

**Error Response (400/500):**

```json
{
  "success": false,
  "error": "Error message here"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**

```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔧 Configuration

### SMTP Settings

The server uses Hostinger SMTP:

- **Host:** smtp.hostinger.com
- **Port:** 465 (SSL/TLS)
- **Secure:** true

### Email Settings

- **From:** `info@modernservices.org.uk`
- **To:** `info@modernservices.org.uk`
- **Reply-To:** User's email address (from form)

## 🛠️ Development

### Running Both Frontend and Backend

**Terminal 1 (Frontend):**

```bash
npm run dev
```

**Terminal 2 (Backend):**

```bash
npm run server:dev
```

## 📦 Production Deployment

### Option 1: Railway (Recommended - Free Tier)

1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add new service → Select `server/` directory
4. Add environment variables in Railway dashboard
5. Deploy!

### Option 2: Render (Free Tier)

1. Create account at [render.com](https://render.com)
2. New Web Service
3. Connect repository
4. Set root directory to `server/`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables
8. Deploy!

### Option 3: Vercel (Serverless Functions)

Convert to Vercel serverless functions (requires code changes).

## 🔒 Security Notes

- Never commit `.env` file to Git
- Use environment variables in production
- Consider rate limiting for production
- The password is stored in `.env` (secure on server)

## 🐛 Troubleshooting

### "SMTP connection error"

- Check your SMTP credentials in `.env`
- Verify Hostinger SMTP is accessible
- Check firewall/network settings

### "Failed to send email"

- Verify SMTP password is correct
- Check email account is active
- Review server logs for detailed errors

### CORS Errors

- Ensure CORS is enabled (already configured)
- Check frontend URL matches allowed origins

## 📝 Notes

- Server runs on port 3001 by default
- Change `PORT` in `.env` if needed
- Frontend should set `VITE_API_URL` to production URL when deployed
