import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/*
 * Example MCP server
 *
 * This script defines a simple Model Context Protocol (MCP) server
 * that exposes two tools to the client:
 *
 *   1. add – adds two numbers together and returns the sum.
 *   2. getTime – returns the current ISO timestamp.  This demonstrates
 *      how you might expose useful data to a client.
 *
 * The server uses the StdioServerTransport for communication, which
 * is the standard way to run MCP servers locally with tools like
 * Claude Desktop or Cursor. You can extend this file by adding your
 * own tools with custom parameters and logic.
 */

async function main() {
  // Instantiate the server with a name and version
  const server = new McpServer({
    name: "Example MCP Server",
    version: "1.0.0",
  });

  // Tool 1: add – accepts two numbers and returns their sum
  server.tool(
    "add",
    "Add two numbers together",
    { a: z.number(), b: z.number() },
    async ({ a, b }) => {
      const sum = a + b;
      return {
        content: [{ type: "text", text: String(sum) }],
      };
    }
  );

  // Tool 2: getTime – returns the current time in ISO format
  server.tool(
    "getTime",
    "Get the current server time",
    {},
    async () => {
      const now = new Date().toISOString();
      return {
        content: [{ type: "text", text: now }],
      };
    }
  );

  // Create a transport that reads/writes JSON via stdio
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// The top-level await ensures our async function runs
main().catch((err) => {
  console.error(err);
});