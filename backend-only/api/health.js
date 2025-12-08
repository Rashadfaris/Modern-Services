export default async function handler(req, res) {
  // CORS headers - Allow your Hostinger frontend domain
  const allowedOrigins = [
    'https://modernservices.org.uk',
    'https://www.modernservices.org.uk',
    'http://localhost:5173',
    'http://localhost:3000',
  ];
  
  const origin = req.headers.origin;
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  return res.status(200).json({
    status: 'ok',
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
  });
}

