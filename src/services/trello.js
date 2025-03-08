const fetch = require('node-fetch');

const TRELLO_API_BASE = 'https://api.trello.com/1';

/**
 * Collection of handler functions for Trello API interactions
 */
const trelloHandlers = {
  /**
   * Get all boards for the authenticated user
   */
  async getBoards(parameters, req, res) {
    try {
      const url = `${TRELLO_API_BASE}/members/me/boards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch Trello boards');
      }
      
      res.json(data.map(board => ({
        id: board.id,
        name: board.name,
        description: board.desc,
        url: board.url,
        closed: board.closed
      })));
    } catch (error) {
      console.error('Error fetching boards:', error);
      res.status(500).json({
        error: {
          message: error.message || 'Failed to fetch Trello boards'
        }
      });
    }
  },

  /**
   * Get all lists for a specific board
   */
  async getLists(parameters, req, res) {
    try {
      const { board_id } = parameters;
      
      if (!board_id) {
        return res.status(400).json({
          error: {
            message: 'board_id is required'
          }
        });
      }
      
      const url = `${TRELLO_API_BASE}/boards/${board_id}/lists?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch Trello lists');
      }
      
      res.json(data.map(list => ({
        id: list.id,
        name: list.name,
        closed: list.closed,
        position: list.pos,
        board_id: list.idBoard
      })));
    } catch (error) {
      console.error('Error fetching lists:', error);
      res.status(500).json({
        error: {
          message: error.message || 'Failed to fetch Trello lists'
        }
      });
    }
  },

  /**
   * Get all cards in a specific list
   */
  async getCards(parameters, req, res) {
    try {
      const { list_id } = parameters;
      
      if (!list_id) {
        return res.status(400).json({
          error: {
            message: 'list_id is required'
          }
        });
      }
      
      const url = `${TRELLO_API_BASE}/lists/${list_id}/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch Trello cards');
      }
      
      res.json(data.map(card => ({
        id: card.id,
        name: card.name,
        description: card.desc,
        url: card.url,
        due: card.due,
        closed: card.closed,
        list_id: card.idList,
        board_id: card.idBoard
      })));
    } catch (error) {
      console.error('Error fetching cards:', error);
      res.status(500).json({
        error: {
          message: error.message || 'Failed to fetch Trello cards'
        }
      });
    }
  },

  /**
   * Create a new card in a list
   */
  async createCard(parameters, req, res) {
    try {
      const { list_id, name, description, due } = parameters;
      
      if (!list_id || !name) {
        return res.status(400).json({
          error: {
            message: 'list_id and name are required'
          }
        });
      }
      
      const body = {
        idList: list_id,
        name,
        desc: description || '',
        due: due || null
      };
      
      const url = `${TRELLO_API_BASE}/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create Trello card');
      }
      
      res.json({
        id: data.id,
        name: data.name,
        description: data.desc,
        url: data.url,
        due: data.due,
        list_id: data.idList,
        board_id: data.idBoard
      });
    } catch (error) {
      console.error('Error creating card:', error);
      res.status(500).json({
        error: {
          message: error.message || 'Failed to create Trello card'
        }
      });
    }
  },

  /**
   * Update an existing card
   */
  async updateCard(parameters, req, res) {
    try {
      const { card_id, name, description, due } = parameters;
      
      if (!card_id) {
        return res.status(400).json({
          error: {
            message: 'card_id is required'
          }
        });
      }
      
      const body = {};
      if (name) body.name = name;
      if (description !== undefined) body.desc = description;
      if (due !== undefined) body.due = due;
      
      const url = `${TRELLO_API_BASE}/cards/${card_id}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update Trello card');
      }
      
      res.json({
        id: data.id,
        name: data.name,
        description: data.desc,
        url: data.url,
        due: data.due,
        list_id: data.idList,
        board_id: data.idBoard
      });
    } catch (error) {
      console.error('Error updating card:', error);
      res.status(500).json({
        error: {
          message: error.message || 'Failed to update Trello card'
        }
      });
    }
  },

  /**
   * Move a card to a different list
   */
  async moveCard(parameters, req, res) {
    try {
      const { card_id, list_id } = parameters;
      
      if (!card_id || !list_id) {
        return res.status(400).json({
          error: {
            message: 'card_id and list_id are required'
          }
        });
      }
      
      const url = `${TRELLO_API_BASE}/cards/${card_id}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idList: list_id })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to move Trello card');
      }
      
      res.json({
        id: data.id,
        name: data.name,
        list_id: data.idList,
        board_id: data.idBoard,
        url: data.url
      });
    } catch (error) {
      console.error('Error moving card:', error);
      res.status(500).json({
        error: {
          message: error.message || 'Failed to move Trello card'
        }
      });
    }
  }
};

module.exports = { trelloHandlers };
