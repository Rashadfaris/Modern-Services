# SMTP Authentication Troubleshooting

## Error: "535 5.7.8 Error: authentication failed"

This error means the SMTP server is rejecting your credentials. Here are solutions:

### Solution 1: Verify Password in .env File

1. Open `server/.env` file
2. Make sure the password is exactly: `MuFaMod*!`
3. No extra spaces or quotes around the password
4. Save the file
5. Restart the server

### Solution 2: Try Port 587 Instead of 465

Some Hostinger accounts work better with port 587 (STARTTLS) instead of 465 (SSL).

Update `server/.env`:

```env
SMTP_PORT=587
```

Then restart the server.

### Solution 3: Check Password Special Characters

If your password has special characters, try:

1. Escape them properly in the `.env` file
2. Or wrap the password in quotes: `SMTP_PASSWORD="MuFaMod*!"`

### Solution 4: Verify Hostinger Email Account

1. Log into your Hostinger email account (`info@modernservices.org.uk`)
2. Make sure the account is active
3. Verify the password is correct
4. Check if there are any security restrictions

### Solution 5: Check Hostinger SMTP Settings

Hostinger sometimes requires:

- **Port 587** with STARTTLS (not SSL)
- **Port 465** with SSL/TLS
- Make sure SMTP is enabled in your Hostinger control panel

### Solution 6: Test with Different Authentication

Try updating `server/index.js` to use different auth method:

```javascript
auth: {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD,
  method: 'PLAIN' // or 'LOGIN'
}
```

### Solution 7: Check .env File Format

Make sure your `.env` file looks exactly like this (no spaces around `=`):

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=MuFaMod*!
PORT=3001
NODE_ENV=development
```

### Solution 8: Enable Debug Logging

The server already has debug logging enabled in development mode. Check the console output for detailed error messages.

### Solution 9: Contact Hostinger Support

If none of the above work:

1. Contact Hostinger support
2. Ask for the correct SMTP settings for your account
3. Verify if SMTP is enabled for your email account
4. Ask if there are any IP restrictions

### Alternative: Use Port 587 (STARTTLS)

Update `server/.env`:

```env
SMTP_PORT=587
```

And the code will automatically use STARTTLS instead of SSL.

---

## Quick Checklist

- [ ] `.env` file exists in `server/` folder
- [ ] Password is correct (no typos)
- [ ] No extra spaces in `.env` file
- [ ] Email account is active
- [ ] Tried both port 465 and 587
- [ ] Restarted server after changes
- [ ] Checked Hostinger control panel for SMTP settings
