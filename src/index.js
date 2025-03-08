require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { setupMCPRoutes } = require('./routes/mcp');
const { validateEnv } = require('./utils/validateEnv');

// Validate required environment variables
validateEnv();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
setupMCPRoutes(app);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`MCP Server running on port ${PORT}`);
});
