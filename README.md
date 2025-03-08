# Trello MCP Server

A Model Context Protocol (MCP) server for Trello integration with Claude for Desktop and other MCP-compatible AI systems.

## Overview

This server allows Claude and other AI systems to interact with Trello boards, lists, and cards through the Model Context Protocol. It enables capabilities like fetching cards, creating new ones, moving cards between lists, and more - all with user approval.

## Features

- Get lists from a specified Trello board
- Fetch cards from specific lists
- Create new cards with names, descriptions, due dates
- Update existing cards
- Archive cards or lists
- Get recent activity from a board
- View cards assigned to the current user

## Setup and Installation

### Prerequisites

- Node.js v16 or later
- A Trello account with API access
- Trello API key and token
- A Trello board to work with

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/cskiro/trello-mcp-server.git
   cd trello-mcp-server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Trello credentials:
   ```
   TRELLO_API_KEY=your_trello_api_key
   TRELLO_TOKEN=your_trello_api_token
   TRELLO_BOARD_ID=your_trello_board_id
   ```

   You can obtain your Trello API key from https://trello.com/app-key and generate a token with the appropriate permissions.

4. Build the server
   ```bash
   npm run build
   ```

5. Start the server
   ```bash
   npm start
   ```

## Usage with Claude for Desktop

This MCP server is designed to work with Claude for Desktop. When using the application:

1. Configure Claude for Desktop to use this MCP server
2. Claude will be able to interact with your Trello account when you approve function calls
3. Example queries to try with Claude:
   - "Show me all the lists on my Trello board"
   - "Create a new card in my 'To Do' list for completing documentation"
   - "What recent activity has happened on my board?"

## How It Works

This server implements the Model Context Protocol (MCP), which provides a standardized way for AI systems to call functions in external systems with user permission. When Claude wants to interact with Trello:

1. Claude asks you if it can call a specific function (e.g., "Can I create a new card?")
2. If you approve, Claude sends the function call to this server
3. The server executes the requested action against the Trello API
4. Results are sent back to Claude to continue the conversation

## Development

### Building from Source

```bash
npm run build
```

### Running in Development Mode

```bash
npm run dev
```

## License

MIT
