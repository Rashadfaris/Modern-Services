# 🚀 Complete Fly.io Deployment Steps

## ⚠️ Payment Method Required

Fly.io requires a payment method on file **even for the free tier**. You won't be charged unless you exceed free tier limits.

**Add Payment Method:**

1. Go to: https://fly.io/dashboard/rashad-faris/billing
2. Add your credit card
3. Return here to continue deployment

## ✅ Already Completed

- [x] Fly.io CLI installed
- [x] Logged in as `rashadfaris4675@gmail.com`
- [x] `fly.toml` configuration file created
- [x] `Dockerfile` created
- [x] Backend code ready

## 🚀 Complete Deployment Steps

### Step 1: Add Payment Method (Required)

1. Visit: https://fly.io/dashboard/rashad-faris/billing
2. Click "Add Payment Method"
3. Enter your card details
4. Confirm (you won't be charged on free tier)

### Step 2: Launch App

Open PowerShell in `backend-only` directory and run:

```powershell
# Add Fly.io to PATH
$env:PATH += ";$env:USERPROFILE\.fly\bin"

# Launch app (will ask to use existing fly.toml - answer 'y')
flyctl launch
```

**When prompted:**

- Use existing fly.toml? → **y** (yes)
- Overwrite Dockerfile? → **y** (yes, use our optimized one)

### Step 3: Set Environment Variables (Secrets)

```powershell
flyctl secrets set SMTP_HOST=smtp.hostinger.com SMTP_PORT=587 SMTP_USER=info@modernservices.org.uk SMTP_PASSWORD=your_actual_password_here
```

**Replace `your_actual_password_here` with your actual SMTP password.**

### Step 4: Deploy

```powershell
flyctl deploy
```

This will:

- Build Docker image
- Push to Fly.io
- Deploy your app
- Assign URL: `https://modern-services-backend.fly.dev`

### Step 5: Verify Deployment

```powershell
# Check status
flyctl status

# View logs
flyctl logs

# Open in browser
flyctl open
```

### Step 6: Test Endpoints

1. **Health Check:**

   ```
   https://modern-services-backend.fly.dev/api/health
   ```

   Should return: `{"status":"ok","message":"Backend is running",...}`

2. **Send Email:**
   ```
   POST https://modern-services-backend.fly.dev/api/send-email
   ```

## 📋 Complete Command Sequence

Copy and paste this entire block into PowerShell:

```powershell
# Add Fly.io to PATH
$env:PATH += ";$env:USERPROFILE\.fly\bin"

# Launch app (interactive - answer prompts)
flyctl launch

# Set secrets (replace YOUR_PASSWORD with actual password)
flyctl secrets set SMTP_HOST=smtp.hostinger.com SMTP_PORT=587 SMTP_USER=info@modernservices.org.uk SMTP_PASSWORD=YOUR_PASSWORD

# Deploy
flyctl deploy

# Open app
flyctl open
```

## 🔍 Troubleshooting

### "Payment method required"

- Add payment method at: https://fly.io/dashboard/rashad-faris/billing
- Free tier won't charge you

### "App name already taken"

- Change app name in `fly.toml`: `app = "modern-services-backend-2"`
- Or use: `flyctl launch --name your-unique-name`

### "Command not found"

- Add to PATH: `$env:PATH += ";$env:USERPROFILE\.fly\bin"`
- Or use full path: `C:\Users\Rashad's_HP\.fly\bin\flyctl.exe`

## ✅ After Deployment

Your backend will be available at:

- **URL:** `https://modern-services-backend.fly.dev`
- **Health:** `https://modern-services-backend.fly.dev/api/health`
- **Email:** `https://modern-services-backend.fly.dev/api/send-email`

## 📝 Next Steps

1. Add payment method (if not done)
2. Run `flyctl launch`
3. Set secrets with your SMTP password
4. Run `flyctl deploy`
5. Test endpoints
6. Update frontend to use Fly.io URL

## 💡 Pro Tips

- **Free Tier Limits:** 3 shared VMs, 3GB storage, 160GB transfer
- **Auto-scaling:** Machines auto-stop/start (no sleep delays)
- **Health Checks:** Configured to ping `/api/health` every 30s
- **Logs:** Use `flyctl logs` to debug issues
- **Secrets:** Use `flyctl secrets list` to verify they're set

Good luck with your deployment! 🚀
