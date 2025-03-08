const { authMiddleware } = require('../middleware/auth');
const { trelloHandlers } = require('../services/trello');

/**
 * Sets up MCP routes for the application
 * @param {Express} app - Express application instance
 */
function setupMCPRoutes(app) {
  // MCP endpoint for function calls
  app.post('/mcp/v1', authMiddleware, async (req, res) => {
    try {
      const { function_name, parameters } = req.body;
      
      // Route to appropriate function handler
      switch (function_name) {
        case 'get_trello_boards':
          await trelloHandlers.getBoards(parameters, req, res);
          break;
        case 'get_trello_lists':
          await trelloHandlers.getLists(parameters, req, res);
          break;
        case 'get_trello_cards':
          await trelloHandlers.getCards(parameters, req, res);
          break;
        case 'create_trello_card':
          await trelloHandlers.createCard(parameters, req, res);
          break;
        case 'update_trello_card':
          await trelloHandlers.updateCard(parameters, req, res);
          break;
        case 'move_trello_card':
          await trelloHandlers.moveCard(parameters, req, res);
          break;
        default:
          res.status(400).json({
            error: {
              message: `Unknown function: ${function_name}`
            }
          });
      }
    } catch (error) {
      console.error('Error handling MCP request:', error);
      res.status(500).json({
        error: {
          message: error.message || 'Internal server error'
        }
      });
    }
  });

  // MCP manifest endpoint
  app.get('/mcp/v1/manifest', (req, res) => {
    res.json({
      schema_version: "v1",
      name: "Trello",
      description: "Interact with Trello boards, lists, and cards",
      functions: [
        {
          name: "get_trello_boards",
          description: "Get all Trello boards for the authenticated user",
          parameters: {
            type: "object",
            properties: {},
            required: []
          }
        },
        {
          name: "get_trello_lists",
          description: "Get all lists for a specific Trello board",
          parameters: {
            type: "object",
            properties: {
              board_id: {
                type: "string",
                description: "ID of the Trello board"
              }
            },
            required: ["board_id"]
          }
        },
        {
          name: "get_trello_cards",
          description: "Get all cards in a specific Trello list",
          parameters: {
            type: "object",
            properties: {
              list_id: {
                type: "string",
                description: "ID of the Trello list"
              }
            },
            required: ["list_id"]
          }
        },
        {
          name: "create_trello_card",
          description: "Create a new card in a Trello list",
          parameters: {
            type: "object",
            properties: {
              list_id: {
                type: "string",
                description: "ID of the Trello list"
              },
              name: {
                type: "string",
                description: "Name/title of the card"
              },
              description: {
                type: "string",
                description: "Description of the card"
              },
              due: {
                type: "string",
                description: "Due date for the card in ISO format (optional)"
              }
            },
            required: ["list_id", "name"]
          }
        },
        {
          name: "update_trello_card",
          description: "Update an existing Trello card",
          parameters: {
            type: "object",
            properties: {
              card_id: {
                type: "string",
                description: "ID of the card to update"
              },
              name: {
                type: "string",
                description: "New name/title for the card (optional)"
              },
              description: {
                type: "string",
                description: "New description for the card (optional)"
              },
              due: {
                type: "string",
                description: "New due date in ISO format (optional)"
              }
            },
            required: ["card_id"]
          }
        },
        {
          name: "move_trello_card",
          description: "Move a card to a different list",
          parameters: {
            type: "object",
            properties: {
              card_id: {
                type: "string",
                description: "ID of the card to move"
              },
              list_id: {
                type: "string",
                description: "ID of the destination list"
              }
            },
            required: ["card_id", "list_id"]
          }
        }
      ]
    });
  });
}

module.exports = { setupMCPRoutes };
