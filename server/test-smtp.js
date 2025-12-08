/**
 * SMTP Connection Test Script
 * Run this to test your SMTP credentials directly
 * Usage: node test-smtp.js
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 SMTP Connection Test\n');
console.log('='.repeat(50));

// Display configuration (without password)
console.log('\n📋 Configuration:');
console.log(`  Host: ${process.env.SMTP_HOST || 'smtp.hostinger.com'}`);
console.log(`  Port: ${process.env.SMTP_PORT || '465'}`);
console.log(`  User: ${process.env.SMTP_USER || 'info@modernservices.org.uk'}`);
console.log(`  Password: ${process.env.SMTP_PASSWORD ? '***' + process.env.SMTP_PASSWORD.slice(-2) : 'NOT SET'}`);
console.log(`  Password Length: ${process.env.SMTP_PASSWORD?.length || 0} characters`);

// Check if password exists
if (!process.env.SMTP_PASSWORD) {
  console.error('\n❌ ERROR: SMTP_PASSWORD is not set in .env file!');
  process.exit(1);
}

// Test different configurations
const configs = [
  {
    name: 'Port 465 (SSL)',
    config: {
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'info@modernservices.org.uk',
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  },
  {
    name: 'Port 587 (STARTTLS)',
    config: {
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'info@modernservices.org.uk',
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  },
  {
    name: 'Port 465 (SSL) - Alternative Auth',
    config: {
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'info@modernservices.org.uk',
        pass: process.env.SMTP_PASSWORD,
      },
      authMethod: 'PLAIN',
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3',
      },
    },
  },
];

async function testConfig(configObj) {
  console.log(`\n🧪 Testing: ${configObj.name}`);
  console.log('-'.repeat(50));

  const transporter = nodemailer.createTransport(configObj.config);

  try {
    // Test connection
    await transporter.verify();
    console.log('✅ Connection successful!');
    
    // Try sending a test email
    console.log('📧 Attempting to send test email...');
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to yourself
      subject: 'SMTP Test Email',
      text: 'This is a test email to verify SMTP configuration.',
      html: '<p>This is a test email to verify SMTP configuration.</p>',
    });
    
    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(`   Code: ${error.code || 'N/A'}`);
    console.error(`   Command: ${error.command || 'N/A'}`);
    console.error(`   Response: ${error.response || error.message}`);
    
    // Provide specific guidance based on error
    if (error.code === 'EAUTH') {
      console.error('\n💡 Authentication Error - Possible causes:');
      console.error('   1. Incorrect password');
      console.error('   2. Account requires app-specific password');
      console.error('   3. 2FA is enabled (needs app password)');
      console.error('   4. Account is locked or suspended');
      console.error('   5. SMTP access not enabled in Hostinger control panel');
    } else if (error.code === 'ECONNECTION') {
      console.error('\n💡 Connection Error - Possible causes:');
      console.error('   1. Wrong SMTP host');
      console.error('   2. Firewall blocking connection');
      console.error('   3. Port is blocked');
    }
    
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('\n🚀 Starting SMTP tests...\n');
  
  for (const config of configs) {
    const success = await testConfig(config);
    if (success) {
      console.log(`\n✅ SUCCESS! Use this configuration:`);
      console.log(JSON.stringify(config.config, null, 2));
      process.exit(0);
    }
    // Wait a bit between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n❌ All configurations failed. Please check:');
  console.log('   1. Your .env file in the server/ directory');
  console.log('   2. Password is correct (no extra spaces)');
  console.log('   3. Email account is active');
  console.log('   4. SMTP is enabled in Hostinger control panel');
  console.log('   5. No 2FA requiring app password');
  
  process.exit(1);
}

runTests();

