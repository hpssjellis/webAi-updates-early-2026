import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import http from "http";

// 1. Create the MCP Server
const myMcpServer = new McpServer({
    name: "MyLocalBridge",
    version: "1.0.0"
});

// 2. Add a Tool that the AI can call
// This tool doesn't do the work itself; it tells the browser to do it!
myMcpServer.tool("myUpdateCounter", 
    "Increments the visitor counter on the active mcp_demo.html page.",
    async () => {
        // In a real 2026 WebMCP setup, the bridge routes this to the browser
        console.error("AI Agent is calling the 'myUpdateCounter' tool...");
        
        return {
            content: [{ type: "text", text: "Tool received! Check your browser tab for the update." }]
        };
    }
);

// 3. Simple Health Check for your index.html Dashboard
const myHealthPort = 3000;
http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows your local HTML to "ping" it
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: "online", message: "Bridge is active!" }));
}).listen(myHealthPort);

// 4. Start the MCP connection
const myTransport = new StdioServerTransport();
myMcpServer.connect(myTransport);

console.error(`MCP Bridge and Health Check running on port ${myHealthPort}`);
