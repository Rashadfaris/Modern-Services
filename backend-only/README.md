# Backend API for Modern Services

This folder contains serverless functions for Vercel.

## Structure

```
backend-only/
├── api/
│   ├── send-email.js  (Contact form email handler)
│   └── health.js       (Health check endpoint)
├── package.json
└── vercel.json
```

## Deployment to Vercel

1. **Root Directory**: Use `backend-only/` as root (or deploy this folder directly)

2. **Environment Variables** (Set in Vercel Dashboard):

   ```
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=587
   SMTP_USER=info@modernservices.org.uk
   SMTP_PASSWORD=MuFaMod*!
   ```

3. **No Build Required**: These are serverless functions, no build step needed.

## API Endpoints

After deployment, your API will be available at:

- `https://your-project.vercel.app/api/health` (GET)
- `https://your-project.vercel.app/api/send-email` (POST)

## Testing

Test the health endpoint:

```bash
curl https://your-project.vercel.app/api/health
```

Should return:

```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "..."
}
```
