import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import http from "http";

const myServer = new McpServer({
    name: "MyStudentBridge",
    version: "1.0.0"
});

// --- TOOL 1: COUNTER ---
myServer.tool("myCountVisitor", "Increments the visitor counter.", async () => {
    return { content: [{ type: "text", text: "Instruction sent to browser to increment counter." }] };
});

// --- TOOL 2: THEME ---
myServer.tool("mySetTheme", "Changes page color. Params: color (string)", async ({ color }) => {
    return { content: [{ type: "text", text: `Instruction sent: Change theme to ${color}` }] };
});

// --- TOOL 3: PURPOSE ---
myServer.tool("myGetPagePurpose", "Explains the site purpose.", async () => {
    return { content: [{ type: "text", text: "This is a student dashboard for WebMCP learning." }] };
});

// --- TOOL 4: MESSAGE ---
myServer.tool("myShowMessage", "Shows a message on screen. Params: message (string)", async ({ message }) => {
    return { content: [{ type: "text", text: `Instruction sent: Display "${message}"` }] };
});

// --- TOOL 5: RANDOM FACT ---
myServer.tool("myGetRandomFact", "Gets a random science fact.", async () => {
    const myFacts = ["Octopuses have 3 hearts.", "Honey never spoils.", "Bananas are berries."];
    const myFact = myFacts[Math.floor(Math.random() * myFacts.length)];
    return { content: [{ type: "text", text: myFact }] };
});

// --- DASHBOARD HEALTH CHECK ---
http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: "online" }));
}).listen(3000);

const myTransport = new StdioServerTransport();
myServer.connect(myTransport);
