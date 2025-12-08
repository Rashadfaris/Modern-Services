# PowerShell script to create .env file for server

$envContent = @"
# SMTP Configuration (Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=MuFaMod*!

# Server Configuration
PORT=3001
NODE_ENV=development
"@

$envContent | Out-File -FilePath ".env" -Encoding utf8
Write-Host "✅ .env file created successfully!" -ForegroundColor Green

