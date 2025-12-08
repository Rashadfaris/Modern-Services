import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Debug: Log environment variables (without password)
if (process.env.NODE_ENV === 'development') {
  console.log('\n🔍 Environment Check:');
  console.log(`  SMTP_HOST: ${process.env.SMTP_HOST || 'NOT SET'}`);
  console.log(`  SMTP_PORT: ${process.env.SMTP_PORT || 'NOT SET'}`);
  console.log(`  SMTP_USER: ${process.env.SMTP_USER || 'NOT SET'}`);
  console.log(`  SMTP_PASSWORD: ${process.env.SMTP_PASSWORD ? '***SET*** (length: ' + process.env.SMTP_PASSWORD.length + ')' : 'NOT SET'}`);
  console.log('');
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer transporter configuration
// Try port 587 with STARTTLS first (more compatible), fallback to 465 with SSL
const smtpPort = parseInt(process.env.SMTP_PORT || '587');
const useSecure = smtpPort === 465;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: smtpPort,
  secure: useSecure, // true for 465, false for 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USER || 'info@modernservices.org.uk',
    pass: process.env.SMTP_PASSWORD || '',
  },
  tls: {
    // Do not fail on invalid certificates
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  },
  debug: process.env.NODE_ENV === 'development', // Enable debug output
  logger: process.env.NODE_ENV === 'development', // Log to console
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP connection error:', error);
  } else {
    console.log('✅ SMTP server is ready to send emails');
  }
});

// Contact form email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address',
      });
    }

    // Prepare email content
    const mailOptions = {
      from: `"Modern Services Website" <${process.env.SMTP_USER || 'info@modernservices.org.uk'}>`,
      to: 'info@modernservices.org.uk',
      replyTo: email, // Allow replying directly to the sender
      subject: `An email from client ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #0A1A2F;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              .content {
                background-color: #f9f9f9;
                padding: 20px;
                border: 1px solid #ddd;
                border-top: none;
              }
              .form-details {
                background-color: white;
                padding: 20px;
                margin: 15px 0;
                border-left: 4px solid #C8A75B;
                border-radius: 4px;
              }
              .detail-row {
                margin: 12px 0;
                padding: 8px 0;
                border-bottom: 1px solid #eee;
              }
              .detail-row:last-child {
                border-bottom: none;
              }
              .label {
                font-weight: bold;
                color: #0A1A2F;
                display: inline-block;
                min-width: 80px;
              }
              .value {
                color: #555;
              }
              .message-box {
                background-color: #f5f5f5;
                padding: 15px;
                border-radius: 4px;
                margin-top: 10px;
                white-space: pre-wrap;
                font-family: inherit;
              }
              .footer {
                text-align: center;
                color: #666;
                font-size: 12px;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
              }
              .reply-button {
                display: inline-block;
                background-color: #C8A75B;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 15px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>Message </h2>
            </div>
            <div class="content">

            
              <div class="form-details">
                <div class="detail-row">
                  <span class="label">Name:</span>
                  <span class="value">${name}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${email}">${email}</a></span>
                </div>
                ${phone ? `
                <div class="detail-row">
                  <span class="label">Phone:</span>
                  <span class="value">${phone}</span>
                </div>
                ` : ''}
                <div class="detail-row">
                  <span class="label">Message:</span>
                </div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd;">

              </div>
            </div>
            <div class="footer">
            
              <p>Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

---
Reply to: ${email}
Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
      `.trim(),
    };

    // Send notification email to Modern Services
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Notification email sent to Modern Services:', info.messageId);

    // Send automated confirmation/reply email to the client
    const clientConfirmationEmail = {
      from: `"Modern Services" <${process.env.SMTP_USER || 'info@modernservices.org.uk'}>`,
      to: email, // Send to the client who submitted the form
      subject: 'Thank you for contacting Modern Services',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #0A1A2F;
                color: white;
                padding: 30px 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              .content {
                background-color: #ffffff;
                padding: 30px;
                border: 1px solid #ddd;
                border-top: none;
              }
              .greeting {
                font-size: 18px;
                color: #0A1A2F;
                margin-bottom: 20px;
              }
              .message {
                color: #555;
                margin-bottom: 20px;
                line-height: 1.8;
              }
              .highlight-box {
                background-color: #f9f9f9;
                border-left: 4px solid #C8A75B;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .contact-info {
                background-color: #F4F5F7;
                padding: 20px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .contact-info h3 {
                color: #0A1A2F;
                margin-top: 0;
                margin-bottom: 15px;
              }
              .contact-item {
                margin: 10px 0;
                color: #555;
              }
              .contact-item strong {
                color: #0A1A2F;
              }
              .footer {
                text-align: center;
                color: #666;
                font-size: 12px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
              }
              .signature {
                margin-top: 30px;
                color: #0A1A2F;
              }
              .signature strong {
                color: #C8A75B;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>Thank You for Contacting Modern Services</h2>
            </div>
            <div class="content">
              <div class="greeting">
                Dear ${name},
              </div>
              
              <div class="message">
                <p>Thank you for reaching out to Modern Services. We have successfully received your message and appreciate you taking the time to contact us.</p>
                
                <div class="highlight-box">
                  <p style="margin: 0;"><strong>Your Message:</strong></p>
                  <p style="margin-top: 10px; white-space: pre-wrap; color: #555;">${message}</p>
                </div>
                
                <p>Our team will review your inquiry and get back to you within <strong>24 hours</strong> during business hours (Monday - Friday, 9:00 AM - 6:00 PM GMT).</p>
              </div>
              
              <div class="contact-info">
                <h3>Need Immediate Assistance?</h3>
                <div class="contact-item">
                  <strong>Phone:</strong> +44 7808 646056
                </div>
                <div class="contact-item">
                  <strong>Email:</strong> <a href="mailto:info@modernservices.org.uk" style="color: #C8A75B;">info@modernservices.org.uk</a>
                </div>
                <div class="contact-item">
                  <strong>WhatsApp:</strong> <a href="https://wa.me/447808646056" style="color: #C8A75B;">Chat with us instantly</a>
                </div>
              </div>
              
              <div class="signature">
                <p>Best regards,<br>
                <strong>The Modern Services Team</strong></p>
                <p style="font-size: 14px; color: #666; margin-top: 10px;">
                  Modern Services - Your Trusted Property Management Partner<br>
                  Company Registration No: OC407556
                </p>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email. Please do not reply to this message.</p>
              <p>If you have any urgent questions, please contact us directly at info@modernservices.org.uk</p>
            </div>
          </body>
        </html>
      `,
      text: `
Thank You for Contacting Modern Services

Dear ${name},

Thank you for reaching out to Modern Services. We have successfully received your message and appreciate you taking the time to contact us.

Your Message:
${message}

Our team will review your inquiry and get back to you within 24 hours during business hours (Monday - Friday, 9:00 AM - 6:00 PM GMT).

Need Immediate Assistance?
Phone: +44 7808 646056
Email: info@modernservices.org.uk
WhatsApp: https://wa.me/447808646056

Best regards,
The Modern Services Team

Modern Services - Your Trusted Property Management Partner
Company Registration No: OC407556

---
This is an automated confirmation email. Please do not reply to this message.
      `.trim(),
    };

    // Send confirmation email to client
    try {
      const confirmationInfo = await transporter.sendMail(clientConfirmationEmail);
      console.log('✅ Confirmation email sent to client:', confirmationInfo.messageId);
    } catch (confirmationError) {
      // Log error but don't fail the request - notification email was already sent
      console.error('⚠️ Failed to send confirmation email to client:', confirmationError);
    }

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 SMTP Host: ${process.env.SMTP_HOST || 'smtp.hostinger.com'}`);
  console.log(`📬 Ready to send emails to: info@modernservices.org.uk`);
});

