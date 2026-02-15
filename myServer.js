import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import http from "http";

const myServer = new McpServer({
    name: "MyStudentBridge",
    version: "1.0.0"
});

// --- TOOL 1: COUNTER ---
myServer.tool("myCountVisitor", "Increments the visitor counter.", async () => {
    console.error("📢 AI Agent requested a visitor count increment.");
    return { content: [{ type: "text", text: "Instruction sent to browser to increment counter." }] };
});

// --- TOOL 2: THEME ---
myServer.tool("mySetTheme", "Changes page color. Params: color (string)", async ({ color }) => {
    console.error(`🎨 AI Agent changing theme to: ${color}`);
    return { content: [{ type: "text", text: `Instruction sent: Change theme to ${color}` }] };
});

// --- TOOL 3: PURPOSE ---
myServer.tool("myGetPagePurpose", "Explains the site purpose.", async () => {
    return { content: [{ type: "text", text: "This is a student dashboard for WebMCP learning." }] };
});

// --- TOOL 4: MESSAGE ---
myServer.tool("myShowMessage", "Shows a message on screen. Params: message (string)", async ({ message }) => {
    console.error(`💬 AI Agent says: ${message}`);
    return { content: [{ type: "text", text: `Instruction sent: Display "${message}"` }] };
});

// --- TOOL 5: RANDOM FACT ---
myServer.tool("myGetRandomFact", "Gets a random science fact.", async () => {
    const myFacts = ["Octopuses have 3 hearts.", "Honey never spoils.", "Bananas are berries."];
    const myFact = myFacts[Math.floor(Math.random() * myFacts.length)];
    return { content: [{ type: "text", text: myFact }] };
});

// --- DASHBOARD HEALTH CHECK & TERMINAL INTERACTION ---
const myHealthPort = 3000;
http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: "online", message: "Bridge is active!" }));
}).listen(myHealthPort, () => {
    // Startup "println" feedback
    console.error("-------------------------------------------");
    console.error(`🚀 WebMCP Bridge started on port ${myHealthPort}`);
    console.error(`✅ Dashboard link: http://localhost:${myHealthPort} (Health Check)`);
    console.error("⌨️  Type 'count' and press Enter to ping the dashboard!");
    console.error("-------------------------------------------");
});

// Listen for your keyboard typing in the terminal
process.stdin.on('data', (myData) => {
    const myInput = myData.toString().trim().toLowerCase();
    if (myInput === 'count') {
        console.error("⚡ Manual Trigger: Sending count ping to dashboard...");
        // In a real MCP setup, the dashboard fetches this status
    } else if (myInput === 'exit') {
        process.exit();
    }
});

const myTransport = new StdioServerTransport();
myServer.connect(myTransport);
