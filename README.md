# Example MCP Server

This repository contains a minimal [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server written in Node.js. The server exposes two simple tools that can be called from AI assistants (such as Claude Desktop or Cursor) via the MCP standard.

<a href="https://glama.ai/mcp/servers/@Mtar786/mcpServer">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@Mtar786/mcpServer/badge" alt="Example Server MCP server" />
</a>

## Tools provided

| Tool name | Description | Parameters | Return value |
|-----------|-------------|-----------|--------------|
| `add`     | Adds two numbers together | `a` (number), `b` (number) | Text containing the sum |
| `getTime` | Returns the current server time in ISO format | _none_ | Text with an ISO timestamp |

These tools are defined in the [`index.js`](./index.js) file using the `McpServer` class from the official SDK. You can extend this server by registering your own tools with custom parameters and logic.

## Installation

1. **Install Node.js** (version 20 or later is recommended).
2. Clone this repository and install dependencies:

   ```bash
   npm install
   ```

   > The `@modelcontextprotocol/sdk` package is published on npm.  This example uses version `1.17.0` as referenced in `package.json`.  MCP requires Node.js 18.x or higher to run properly【364465667226308†L72-L78】.

## Running the server

Run the server with Node:

```bash
npm start
```

By default the server uses the **StdioServerTransport** to communicate. This means it will read JSON‑RPC 2.0 messages from `stdin` and write responses to `stdout`. Tools like Claude Desktop or Cursor will manage this communication for you.

### Connecting with Claude Desktop

To connect this server to Claude Desktop, add an entry in your `mcp.json` configuration file (usually located in your `~/.claude/` or `~/.cursor/` directory depending on the client). An example configuration looks like this:

```json
{
  "mcpServers": {
    "example-server": {
      "command": "/absolute/path/to/node",
      "args": [
        "/absolute/path/to/index.js"
      ]
    }
  }
}
```

Replace the `command` path with the absolute path to your Node binary (e.g. the output of `which node`) and update the `args` path to point to this project's `index.js` file.

After saving the config, restart your Claude Desktop app, grant permission to the tools when prompted, and you can invoke them by writing natural language instructions like:

*“Add 3 and 5.”* — Claude will call the `add` tool and return the sum.

*“What’s the current time?”* — Claude will call the `getTime` tool and return the timestamp.

## References

* The concept of MCP servers is described in Anthropic’s announcement【714031847317279†L20-L36】 and documented in several tutorials【67709559959600†L144-L178】.
* For an example of defining tools with the official SDK, see the minimal server from the `mcp-server-node` project【966057210205090†L0-L18】.

## License

This example is provided for educational purposes. Modify and adapt it to suit your own MCP workflows.