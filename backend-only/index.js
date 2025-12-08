import express from 'express';
import sendEmailHandler from './api/send-email.js';
import healthHandler from './api/health.js';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = [
  'https://modernservices.org.uk',
  'https://www.modernservices.org.uk',
  'http://localhost:5173',
  'http://localhost:3000',
];

// CORS middleware - MUST be first, before everything
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Set CORS headers for ALL requests (including OPTIONS)
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  
  // Handle preflight OPTIONS request - MUST return here
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

// Health check endpoint
app.get('/api/health', async (req, res) => {
  await healthHandler(req, res);
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  await sendEmailHandler(req, res);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Modern Services Backend API',
    endpoints: {
      health: '/api/health',
      sendEmail: '/api/send-email',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📧 Email endpoint: http://localhost:${PORT}/api/send-email`);
});

