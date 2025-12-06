# Issue: Missing Firebase Environment Variables

## 🔴 The Problem

**Error Message:**
```
❌ Missing or empty Firebase environment variables: 
VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, 
VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID
```

## 🔍 Root Causes

### Cause 1: Dev Server Not Restarted (MOST COMMON - 90% of cases)

**Problem:** Vite only reads `.env` files when the dev server **starts**. If you:
- Created the `.env` file after starting the server
- Modified the `.env` file while the server was running
- The server was already running when you added environment variables

**Result:** The environment variables are not loaded, so `import.meta.env.VITE_*` returns `undefined`.

---

### Cause 2: .env File Format Issues

**Problems:**
- Missing newline at end of file
- Duplicate entries
- Extra spaces or quotes
- Wrong file location (not in project root)

---

### Cause 3: .env File Not in Root Directory

**Problem:** The `.env` file must be in the **root directory** of your project (same level as `package.json`), not in a subfolder.

---

## ✅ Solutions

### Solution 1: Restart Dev Server (ALWAYS DO THIS FIRST!)

1. **Stop the dev server:**
   - Press `Ctrl+C` in the terminal where `npm run dev` is running

2. **Start it again:**
   ```powershell
   npm run dev
   ```

3. **Hard refresh browser:**
   - Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

**Why this works:** Vite reads `.env` files only during server startup. Restarting forces it to reload all environment variables.

---

### Solution 2: Verify .env File Format

Your `.env` file should look exactly like this (no quotes, no spaces around `=`):

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyD_3FMW0V5KHCOuh5ntZAxW_9-aQOqfUNU
VITE_FIREBASE_AUTH_DOMAIN=modern-services-4675.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=modern-services-4675
VITE_FIREBASE_STORAGE_BUCKET=modern-services-4675.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=243995977354
VITE_FIREBASE_APP_ID=1:243995977354:web:fbbe9964741567e74c6f73
VITE_FIREBASE_MEASUREMENT_ID=G-CD0Q00J8WE
```

**Important:**
- ✅ No quotes around values
- ✅ No spaces around `=`
- ✅ One variable per line
- ✅ No duplicate entries
- ✅ File ends with a newline

---

### Solution 3: Check File Location

The `.env` file must be in:
```
Modern-Services/
├── .env          ← HERE (root directory)
├── package.json
├── vite.config.ts
└── ...
```

**NOT in:**
- `src/.env` ❌
- `public/.env` ❌
- Any subfolder ❌

---

### Solution 4: Verify File Encoding

The `.env` file should be:
- **Encoding:** UTF-8
- **Line endings:** LF or CRLF (both work)
- **No BOM** (Byte Order Mark)

---

## 🧪 How to Test

After restarting the dev server, check the browser console. You should see:

```
✅ Firebase config loaded: {
  apiKey: "AIzaSyD_3F...",
  authDomain: "modern-services-4675.firebaseapp.com",
  projectId: "modern-services-4675",
  hasMeasurementId: true
}
```

If you see this, the environment variables are loaded correctly!

---

## 📋 Quick Checklist

- [ ] `.env` file exists in root directory
- [ ] All 6 required variables are present
- [ ] No quotes around values
- [ ] No spaces around `=`
- [ ] Dev server was restarted after creating/updating `.env`
- [ ] Browser was hard refreshed (`Ctrl+Shift+R`)

---

## 🚀 Step-by-Step Fix

1. **Stop dev server** (`Ctrl+C`)
2. **Verify `.env` file** (check format and location)
3. **Start dev server** (`npm run dev`)
4. **Hard refresh browser** (`Ctrl+Shift+R`)
5. **Check console** for "✅ Firebase config loaded" message

---

## 🆘 Still Not Working?

If the error persists after restarting:

1. **Check browser console** - Look for the debug message
2. **Verify .env file** - Open it and check all values are there
3. **Try incognito mode** - Rules out browser cache issues
4. **Check file permissions** - Make sure the file is readable

---

## 💡 Why This Happens

**Vite's Environment Variable Loading:**
- Vite reads `.env` files **only at startup**
- Changes to `.env` while server is running are **ignored**
- You **must restart** the server for changes to take effect

This is by design - environment variables are meant to be static configuration, not runtime changes.

