/**
 * Validates that all required environment variables are set
 * @throws {Error} If any required environment variable is missing
 */
function validateEnv() {
  const requiredEnvVars = [
    'TRELLO_API_KEY',
    'TRELLO_API_TOKEN',
    'MCP_AUTH_TOKEN'
  ];

  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  }
}

module.exports = { validateEnv };
