import express from 'express';
import cors from 'cors';
import sendEmailHandler from './api/send-email.js';
import healthHandler from './api/health.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'https://modernservices.org.uk',
    'https://www.modernservices.org.uk',
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  credentials: true,
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', async (req, res) => {
  await healthHandler(req, res);
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  await sendEmailHandler(req, res);
});

// Handle OPTIONS for CORS preflight
app.options('/api/*', (req, res) => {
  res.status(200).end();
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

