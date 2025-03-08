/**
 * Authentication middleware for MCP requests
 * Verifies that the request has the correct authorization token
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: {
        message: 'Authentication required. Please provide a valid bearer token.'
      }
    });
  }
  
  const token = authHeader.split(' ')[1];
  
  if (token !== process.env.MCP_AUTH_TOKEN) {
    return res.status(403).json({
      error: {
        message: 'Invalid authentication token.'
      }
    });
  }
  
  next();
}

module.exports = { authMiddleware };
