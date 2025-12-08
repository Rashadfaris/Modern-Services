# 🪟 Fly.io Windows Setup Guide

## ✅ CLI Installation Complete!

Fly.io CLI has been installed to: `C:\Users\Rashad's_HP\.fly\bin\flyctl.exe`

## 🔧 Add to PATH (Permanent)

To use `flyctl` commands without the full path, add it to your PATH:

### Option 1: Via PowerShell (Current Session Only)

```powershell
$env:PATH += ";$env:USERPROFILE\.fly\bin"
```

### Option 2: Add Permanently to PATH

1. **Open System Environment Variables:**

   - Press `Win + R`
   - Type: `sysdm.cpl` and press Enter
   - Click "Environment Variables"

2. **Edit User PATH:**

   - Under "User variables", select "Path"
   - Click "Edit"
   - Click "New"
   - Add: `%USERPROFILE%\.fly\bin`
   - Click "OK" on all windows

3. **Restart PowerShell/Terminal** for changes to take effect

### Option 3: Create Alias (Use `fly` instead of `flyctl`)

Add this to your PowerShell profile:

```powershell
# Open PowerShell profile
notepad $PROFILE

# Add this line:
Set-Alias fly flyctl
```

Then restart PowerShell.

## 🚀 Quick Start Commands

**Note:** Use `flyctl` (or `fly` if you created the alias)

```powershell
# 1. Login
flyctl auth login

# 2. Navigate to backend (if not already there)
cd backend-only

# 3. Launch app (first time only)
flyctl launch

# 4. Set secrets
flyctl secrets set SMTP_HOST=smtp.hostinger.com SMTP_PORT=587 SMTP_USER=info@modernservices.org.uk SMTP_PASSWORD=your_password

# 5. Deploy
flyctl deploy

# 6. Open app
flyctl open
```

## 📝 Important Notes

- **Command Name:** On Windows, use `flyctl` (not `fly`)
- **PATH:** Add `%USERPROFILE%\.fly\bin` to PATH for permanent access
- **Alias:** Create `fly` alias if you prefer shorter commands

## ✅ Next Steps

1. Add Fly.io to PATH (see above)
2. Restart PowerShell
3. Run `flyctl auth login`
4. Continue with deployment steps in `FLY_DEPLOYMENT.md`
