# Trello MCP Server

A Model Context Protocol (MCP) server for Trello integration with Claude for Desktop.

## Overview

This server provides a bridge between Claude for Desktop and the Trello API, allowing Claude to perform actions in Trello with user approval. The server follows the Model Context Protocol specification to enable function calling capabilities.

## Features

- Get all Trello boards for the authenticated user
- Get lists for a specific board
- Get cards in a specific list
- Create new cards
- Update existing cards
- Move cards between lists

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Trello API key and token

### Installation

1. Clone the repository
```bash
git clone https://github.com/cskiro/trello-mcp-server.git
cd trello-mcp-server
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file based on the `.env.example` file
```bash
cp .env.example .env
```

4. Fill in your environment variables in the `.env` file
```
PORT=3000
TRELLO_API_KEY=your_trello_api_key
TRELLO_API_TOKEN=your_trello_api_token
MCP_AUTH_TOKEN=your_mcp_auth_token
```

### Running the Server

```bash
npm start
# or
yarn start
```

For development with auto-reload:
```bash
npm run dev
# or
yarn dev
```

## API Endpoints

### MCP Function Calling Endpoint

- **POST /mcp/v1**
  - Handles function calls from Claude
  - Requires authorization header with Bearer token

### MCP Manifest Endpoint

- **GET /mcp/v1/manifest**
  - Returns the MCP manifest describing available functions

### Health Check

- **GET /health**
  - Simple endpoint to verify the server is running

## Trello API Functions

- `get_trello_boards` - Get all boards for the user
- `get_trello_lists` - Get all lists for a specific board
- `get_trello_cards` - Get all cards in a specific list
- `create_trello_card` - Create a new card in a list
- `update_trello_card` - Update an existing card
- `move_trello_card` - Move a card to a different list

## License

MIT
