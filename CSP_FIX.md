# 🔒 Content Security Policy (CSP) Fix

## ❌ The Problem

**Error:** `Refused to connect because it violates the document's Content Security Policy`

**Cause:** Hostinger (or your site) has a Content Security Policy that only allows connections to `'self'` (same origin). It's blocking requests to your Railway backend.

## ✅ Solution Applied

I've updated `index.html` to add a CSP meta tag that allows connections to:

- ✅ Your Railway backend: `https://modern-services-backend-production.up.railway.app`
- ✅ All Railway subdomains: `https://*.up.railway.app`
- ✅ Your own domain: `https://modernservices.org.uk`

## 📝 What Was Changed

**File:** `Modern-Services/index.html`

Added CSP meta tag:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="connect-src 'self' https://modern-services-backend-production.up.railway.app https://*.up.railway.app https://modernservices.org.uk https://www.modernservices.org.uk; default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
/>
```

## 🚀 Next Steps

### 1. Rebuild Your Frontend

```bash
npm run build
```

### 2. Upload to Hostinger

Upload the updated `dist/` folder contents to Hostinger's `public_html/` folder.

### 3. Test Again

After uploading:

1. **Clear browser cache** (Ctrl + Shift + R)
2. **Test the health endpoint:**
   ```javascript
   fetch("https://modern-services-backend-production.up.railway.app/api/health")
     .then((res) => res.json())
     .then((data) => console.log("✅ Working!", data))
     .catch((err) => console.error("❌ Error:", err));
   ```
3. **Test the contact form** - should work now!

## ⚠️ Alternative: If Hostinger Has Server-Level CSP

If Hostinger has a CSP configured at the server level (via `.htaccess` or server config), you may need to:

1. **Check for `.htaccess` file** in your Hostinger `public_html/` folder
2. **Look for CSP headers** and update them
3. **Or contact Hostinger support** to allow connections to Railway

## ✅ Expected Result

After updating and uploading:

- ✅ No CSP errors in browser console
- ✅ Health endpoint test works
- ✅ Contact form submits successfully
- ✅ Emails are sent via Railway backend

## 🔍 CSP Explained

**CSP (Content Security Policy)** controls which resources your page can load:

- `connect-src` - Controls which URLs can be fetched (API calls, WebSockets, etc.)
- `'self'` - Only allows same origin
- We added Railway backend to allow external API calls

Your frontend is now configured to allow connections to Railway! 🚀
