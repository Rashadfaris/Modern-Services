# 🚂 Railway CLI Deployment Steps

## ✅ You've Completed:

- ✅ Installed Railway CLI
- ✅ Linked to project: `b5346c23-06a6-44ca-9553-fee7b6afcd7f`

## 🚀 Next Steps to Deploy

### Step 1: Navigate to Backend Directory

```bash
cd backend-only
```

### Step 2: Set Environment Variables

Set your SMTP credentials in Railway:

```bash
railway variables set SMTP_HOST=smtp.hostinger.com
railway variables set SMTP_PORT=587
railway variables set SMTP_USER=info@modernservices.org.uk
railway variables set SMTP_PASSWORD=your_actual_password_here
```

**Or set them all at once:**

```bash
railway variables set SMTP_HOST=smtp.hostinger.com SMTP_PORT=587 SMTP_USER=info@modernservices.org.uk SMTP_PASSWORD=your_password
```

### Step 3: Set Root Directory (Important!)

Railway needs to know to use the `backend-only` folder:

```bash
# Check current settings
railway status

# Set root directory (if needed via dashboard)
# Go to Railway Dashboard → Your Service → Settings → Root Directory
# Set to: backend-only
```

**Note:** Root directory might need to be set in the Railway Dashboard if CLI doesn't support it directly.

### Step 4: Deploy

**Option A: Deploy directly with CLI**

```bash
railway up
```

**Option B: Deploy via Git (Recommended)**

```bash
# Make sure you're in backend-only directory
cd backend-only

# Commit your changes
git add .
git commit -m "Add Railway deployment files"

# Push to trigger Railway deployment
git push
```

Railway will automatically:

- Detect `package.json`
- Run `npm install`
- Run `npm start` (from your package.json)
- Deploy your backend

### Step 5: Get Your Backend URL

After deployment:

```bash
railway domain
```

Or check Railway Dashboard → Your Service → Settings → Networking → Generate Domain

Your backend will be available at:
`https://your-project.up.railway.app`

### Step 6: Test Your Endpoints

```bash
# Health check
curl https://your-project.up.railway.app/api/health

# Should return:
# {"status":"ok","message":"Backend is running","timestamp":"..."}
```

## 📋 Quick Command Reference

```bash
# Check project status
railway status

# View logs
railway logs

# Set environment variable
railway variables set KEY=value

# List all variables
railway variables

# Deploy
railway up

# Open in browser
railway open
```

## ⚙️ Environment Variables Checklist

Make sure these are set:

- [ ] `SMTP_HOST=smtp.hostinger.com`
- [ ] `SMTP_PORT=587`
- [ ] `SMTP_USER=info@modernservices.org.uk`
- [ ] `SMTP_PASSWORD=your_password`
- [ ] `PORT` (auto-set by Railway, no need to add)

## 🔍 Verify Deployment

1. **Check logs:**

   ```bash
   railway logs
   ```

   Look for: `🚀 Server running on port...`

2. **Test health endpoint:**

   ```bash
   curl https://your-project.up.railway.app/api/health
   ```

3. **Check Railway Dashboard:**
   - Service should show "Active" status
   - Logs should show server started successfully

## 🐛 Troubleshooting

### "Cannot find module" errors

- Make sure you're in `backend-only/` directory
- Run `npm install` locally first to verify dependencies

### "Port already in use"

- Railway handles ports automatically, this shouldn't happen
- Check Railway logs for actual error

### Environment variables not working

- Verify with: `railway variables`
- Redeploy after setting variables: `railway up`

### Root directory issues

- Set in Railway Dashboard → Settings → Root Directory → `backend-only`
- Or create a `railway.json` config file (if supported)

## 📝 Notes

- Railway auto-detects `package.json` and `index.js`
- The `start` script in `package.json` will be used automatically
- Railway assigns a port automatically (via `PORT` env var)
- Changes pushed to Git will auto-deploy

## ✅ Success Indicators

You'll know it's working when:

- ✅ `railway logs` shows "Server running on port..."
- ✅ `curl https://your-project.up.railway.app/api/health` returns JSON
- ✅ Railway dashboard shows "Active" status
- ✅ No errors in logs

Good luck with your deployment! 🚀
