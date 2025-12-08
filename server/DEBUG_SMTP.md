# SMTP Authentication Debugging Guide

## 🔍 Step-by-Step Debugging Process

### Step 1: Verify .env File Location and Format

**Check 1: File Location**
```powershell
# From project root
cd server
Test-Path .env
# Should return: True
```

**Check 2: File Contents**
```powershell
# View .env file (be careful - contains password)
Get-Content .env
```

**Expected Format:**
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=MuFaMod*!
PORT=3001
NODE_ENV=development
```

**Common Issues:**
- ❌ Spaces around `=` sign: `SMTP_PASSWORD = MuFaMod*!` (WRONG)
- ✅ No spaces: `SMTP_PASSWORD=MuFaMod*!` (CORRECT)
- ❌ Quotes around values: `SMTP_PASSWORD="MuFaMod*!"` (May cause issues)
- ✅ No quotes: `SMTP_PASSWORD=MuFaMod*!` (CORRECT)
- ❌ Trailing spaces: `SMTP_PASSWORD=MuFaMod*! ` (WRONG)
- ✅ No trailing spaces (CORRECT)

### Step 2: Verify Environment Variables Are Loaded

**Test Script:**
```powershell
cd server
node -e "import('dotenv').then(d => { d.default.config(); console.log('SMTP_PASSWORD length:', process.env.SMTP_PASSWORD?.length || 0); })"
```

**Expected Output:**
```
SMTP_PASSWORD length: 9
```

If length is 0, the password is not being loaded.

### Step 3: Check Password Characters

**Special Characters in Password: `MuFaMod*!`**
- `*` - Asterisk (may need escaping)
- `!` - Exclamation mark (may need escaping)

**Test with Escaped Password:**

Try updating `.env` with escaped characters:
```env
SMTP_PASSWORD=MuFaMod\*!
```

Or try URL encoding:
```env
SMTP_PASSWORD=MuFaMod%2A%21
```

### Step 4: Run SMTP Test Script

**Run the test script:**
```powershell
cd server
node test-smtp.js
```

This will:
1. Test port 465 (SSL)
2. Test port 587 (STARTTLS)
3. Test alternative authentication methods
4. Show detailed error messages

### Step 5: Check Hostinger Account Settings

#### 5.1: Verify Email Account is Active

1. Log into Hostinger control panel
2. Go to Email section
3. Verify `info@modernservices.org.uk` exists and is active
4. Try logging into webmail to confirm password works

#### 5.2: Check SMTP Settings in Hostinger

1. Go to Hostinger control panel
2. Navigate to Email → Email Accounts
3. Click on `info@modernservices.org.uk`
4. Look for "SMTP Settings" or "Email Client Configuration"
5. Verify:
   - SMTP Host: `smtp.hostinger.com`
   - SMTP Port: `465` or `587`
   - Requires SSL/TLS: Yes
   - Authentication: Required

#### 5.3: Check for 2FA or App Password Requirements

**Signs you need an app password:**
- 2FA is enabled on the account
- Error mentions "app password" or "application-specific password"
- Regular password works for webmail but not SMTP

**How to create app password (if available):**
1. Log into Hostinger control panel
2. Go to Security settings
3. Look for "App Passwords" or "Application Passwords"
4. Generate a new app password
5. Use that password in `.env` instead of regular password

### Step 6: Test SMTP Connection Manually

**Using Telnet (if available):**
```powershell
# Test connection (won't authenticate, just checks if port is open)
Test-NetConnection smtp.hostinger.com -Port 465
Test-NetConnection smtp.hostinger.com -Port 587
```

**Using Node.js directly:**
```powershell
cd server
node -e "
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@modernservices.org.uk',
    pass: 'MuFaMod*!'
  }
});
transporter.verify().then(() => console.log('✅ OK')).catch(e => console.error('❌', e.message));
"
```

### Step 7: Check Firewall and Network

**Check if ports are blocked:**
```powershell
# Check if you can reach the SMTP server
Test-NetConnection smtp.hostinger.com -Port 465
Test-NetConnection smtp.hostinger.com -Port 587
```

**If blocked:**
- Check Windows Firewall settings
- Check antivirus software
- Check corporate network restrictions

### Step 8: Try Alternative SMTP Ports

**Update `.env` to try port 587:**
```env
SMTP_PORT=587
```

**Then restart server and test again.**

### Step 9: Check Server Logs

**Enable detailed logging:**

The server already has debug logging. Check the console output for:
- Connection attempts
- Authentication steps
- Detailed error messages

**Look for patterns like:**
```
< 220 smtp.hostinger.com ESMTP
> AUTH PLAIN
< 535 5.7.8 Error: authentication failed
```

### Step 10: Contact Hostinger Support

**If all else fails, contact Hostinger with:**
1. Your domain: `modernservices.org.uk`
2. Email account: `info@modernservices.org.uk`
3. Error message: `535 5.7.8 Error: authentication failed`
4. Ask for:
   - Correct SMTP settings
   - Whether SMTP is enabled for your account
   - If app passwords are required
   - Any IP restrictions

## 🔧 Quick Fixes to Try

### Fix 1: Try Port 587
```env
SMTP_PORT=587
```

### Fix 2: Remove Special Characters from Password
If possible, change password to one without `*` or `!`

### Fix 3: Use Full Email as Username
```env
SMTP_USER=info@modernservices.org.uk
```

### Fix 4: Check Password Encoding
Make sure `.env` file is saved as UTF-8 (not UTF-8 BOM)

### Fix 5: Restart Server After .env Changes
Always restart the server after changing `.env`:
```powershell
# Stop server (Ctrl+C)
# Then restart
npm run dev
```

## 📋 Checklist

- [ ] `.env` file exists in `server/` directory
- [ ] `.env` file has correct format (no spaces around `=`)
- [ ] Password is correct (test by logging into webmail)
- [ ] No quotes around password value
- [ ] Tried both port 465 and 587
- [ ] Email account is active in Hostinger
- [ ] SMTP is enabled in Hostinger control panel
- [ ] No 2FA requiring app password
- [ ] Tested with `test-smtp.js` script
- [ ] Checked firewall/network restrictions
- [ ] Restarted server after .env changes

## 🧪 Test Commands

**1. Check .env file:**
```powershell
cd server
Get-Content .env
```

**2. Test SMTP connection:**
```powershell
cd server
node test-smtp.js
```

**3. Verify environment variables:**
```powershell
cd server
node -e "import('dotenv').then(d => { d.default.config(); console.log('User:', process.env.SMTP_USER); console.log('Password set:', !!process.env.SMTP_PASSWORD); })"
```

**4. Test network connection:**
```powershell
Test-NetConnection smtp.hostinger.com -Port 465
Test-NetConnection smtp.hostinger.com -Port 587
```

## 🎯 Most Common Solutions

1. **Wrong port** → Try 587 instead of 465
2. **Password with special chars** → Escape or change password
3. **2FA enabled** → Use app-specific password
4. **SMTP not enabled** → Enable in Hostinger control panel
5. **Wrong password** → Verify by logging into webmail

