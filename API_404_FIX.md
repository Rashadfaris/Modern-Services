# Fixing 404 on API Endpoints

## ❌ The Problem

Both `/api/health` and `/api/send-email` are returning 404.

**Possible causes:**

1. Functions not being detected by Vercel
2. Wrong root directory configuration
3. Functions not in correct location
4. Build/deployment issue

## ✅ Step-by-Step Fix

### Step 1: Check Vercel Deployment Logs

1. Go to **Vercel Dashboard → Your Project → Deployments**
2. Click on the latest deployment
3. Check **Function Logs** or **Build Logs**
4. Look for:
   - ✅ "Detected API routes" or "Building functions"
   - ✅ "api/health.js" and "api/send-email.js" listed
   - ❌ Any errors about missing files

### Step 2: Verify Root Directory

In **Vercel Dashboard → Settings → General**:

- **Root Directory**: Should be **empty** (if `backend-only/` is your repo root)
- OR set to: `backend-only/` (if deploying from main repo)

**Important:** The `api/` folder must be at the root of what Vercel is deploying.

### Step 3: Check File Structure

Your deployed structure should be:

```
(root)
├── api/
│   ├── health.js
│   └── send-email.js
├── package.json
└── vercel.json
```

**NOT:**

```
backend-only/
  └── api/
```

If you see `backend-only/api/` in logs, the root directory is wrong.

### Step 4: Verify Function Exports

Both files should have:

```javascript
export default async function handler(req, res) {
  // ... code
}
```

✅ This is already correct in your files.

### Step 5: Check Vercel Project Settings

1. **Framework Preset**: "Other" or "None"
2. **Build Command**: Leave empty (or `echo 'No build'`)
3. **Output Directory**: Leave empty
4. **Install Command**: `npm install`

### Step 6: Test Direct Function Access

Try accessing the function directly (if Vercel shows function URLs):

- Check **Deployments → Functions** tab
- Should see `api/health` and `api/send-email` listed
- Click on them to see individual URLs

## 🔧 Alternative: Check Function Detection

### Option A: Check Vercel CLI

If you have Vercel CLI installed:

```bash
cd backend-only
vercel ls
```

Should show your functions.

### Option B: Check Deployment Details

In Vercel Dashboard:

1. Go to **Deployments → Latest Deployment**
2. Click **"View Function Logs"**
3. Should see function invocations

### Option C: Verify API Folder Location

Make sure when you deploy, the structure is:

- If deploying `backend-only/` folder directly → `api/` should be inside it
- If root directory is set → `api/` should be at that root

## 🚀 Quick Fix Steps

1. **Delete and recreate the Vercel project:**

   - Delete current project in Vercel
   - Create new project
   - Deploy `backend-only/` folder
   - Set root directory correctly

2. **Or fix root directory:**

   - Go to Settings → General
   - Set Root Directory to match your structure
   - Redeploy

3. **Check deployment logs:**
   - Look for "Detected API routes"
   - Should see your functions listed

## 📝 Checklist

- [ ] Root directory is set correctly in Vercel
- [ ] `api/` folder is at the deployment root
- [ ] Functions export `export default async function handler`
- [ ] `package.json` exists with `nodemailer` dependency
- [ ] Environment variables are set
- [ ] Deployment logs show functions detected
- [ ] No errors in build/function logs

## 🐛 If Still 404

1. **Check the actual deployment URL:**

   - Make sure you're using the correct Vercel project URL
   - Not a preview URL if you want production

2. **Check function logs:**

   - Go to Functions tab in deployment
   - See if functions are listed
   - Check for any errors

3. **Try redeploying:**
   - Delete deployment
   - Create fresh deployment
   - Make sure root directory is correct

---

**Most common issue:** Wrong root directory setting in Vercel dashboard!
