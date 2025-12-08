# Deploy Backend to Netlify

## 📁 Base Directory for Netlify

**Base Directory:** `backend-only/`

OR if deploying from the main repo:

- **Base Directory:** Leave empty (if `backend-only/` is the repo root)
- **OR:** Set to `backend-only/` (if deploying from main repo)

## ⚠️ Important: Netlify Functions Structure

**Netlify uses a DIFFERENT structure than Vercel:**

- **Vercel:** Functions in `api/` folder
- **Netlify:** Functions in `netlify/functions/` or `functions/` folder

## 🔧 What You Need to Do

### Option 1: Move Functions to Netlify Structure (Recommended)

1. **Create `netlify/functions/` folder:**

   ```bash
   mkdir -p backend-only/netlify/functions
   ```

2. **Move or copy your functions:**

   ```bash
   cp backend-only/api/health.js backend-only/netlify/functions/health.js
   cp backend-only/api/send-email.js backend-only/netlify/functions/send-email.js
   ```

3. **Update function exports** (Netlify uses different format):
   - Change from: `export default async function handler(req, res)`
   - To: `exports.handler = async (event, context) => { ... }`

### Option 2: Use Netlify Redirects (Easier)

Keep your functions in `api/` but configure Netlify to use them:

1. **Create `netlify.toml` in `backend-only/` folder:**

   ```toml
   [build]
     functions = "api"
     command = "echo 'No build needed'"

   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
   ```

2. **Rename `api/` to `netlify/functions/`:**
   ```bash
   mv backend-only/api backend-only/netlify/functions
   ```

### Option 3: Convert Functions to Netlify Format

Netlify functions use a different handler format. You'll need to convert them.

## 📝 Netlify Configuration

### Create `netlify.toml` in `backend-only/` folder:

```toml
[build]
  functions = "netlify/functions"
  command = "echo 'No build needed'"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

## 🔄 Function Format Conversion

### Vercel Format (Current):

```javascript
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // ...
  res.status(200).json({ status: "ok" });
}
```

### Netlify Format (Needed):

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "ok" }),
  };
};
```

## 🚀 Deployment Steps

1. **Set Base Directory in Netlify:**

   - Go to **Site settings → Build & deploy → Build settings**
   - **Base directory:** `backend-only/`
   - **Build command:** Leave empty or `echo 'No build'`
   - **Publish directory:** Leave empty

2. **Set Environment Variables:**

   - Go to **Site settings → Environment variables**
   - Add:
     ```
     SMTP_HOST = smtp.hostinger.com
     SMTP_PORT = 587
     SMTP_USER = info@modernservices.org.uk
     SMTP_PASSWORD = MuFaMod*!
     ```

3. **Deploy:**
   - Connect your Git repo
   - Or drag & drop the `backend-only/` folder

## ⚠️ Important Notes

- **Netlify functions are different from Vercel functions**
- You'll need to convert the function format
- Functions must be in `netlify/functions/` or `functions/` folder
- Base directory should be `backend-only/`

## 🎯 Quick Answer

**Base Directory:** `backend-only/`

**BUT:** You'll need to:

1. Move functions to `netlify/functions/` folder
2. Convert function format from Vercel to Netlify
3. Create `netlify.toml` configuration file

---

**Would you like me to help convert the functions to Netlify format?**
