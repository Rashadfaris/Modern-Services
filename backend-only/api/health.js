export default async function handler(req, res) {
  // CORS is handled by middleware in index.js - no need to set headers here
  
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

