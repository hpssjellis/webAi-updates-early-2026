import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import http from "http";

const myServer = new McpServer({
    name: "MyStudentBridge",
    version: "1.0.0"
});

// --- TOOL 1: COUNTER ---
myServer.tool(
    "myCountVisitor",
    { type: "object", properties: {} },
    async () => {
        console.error("📢 Counter command received from AI. Relaying to browser...");
        return { content: [{ type: "text", text: "Instruction sent to browser." }] };
    }
);

// --- TOOL 2: THEME ---
myServer.tool(
    "mySetTheme",
    {
        type: "object",
        properties: { color: { type: "string" } },
        required: ["color"]
    },
    async ({ color }) => {
        console.error(`🎨 AI Agent changing theme to: ${color}`);
        return { content: [{ type: "text", text: `Instruction sent: Change theme to ${color}` }] };
    }
);

// --- TOOL 3: PURPOSE ---
myServer.tool(
    "myGetPagePurpose",
    { type: "object", properties: {} },
    async () => {
        return { content: [{ type: "text", text: "This is a student dashboard for WebMCP learning." }] };
    }
);

// --- TOOL 4: MESSAGE ---
myServer.tool(
    "myShowMessage",
    {
        type: "object",
        properties: { message: { type: "string" } },
        required: ["message"]
    },
    async ({ message }) => {
        console.error(`💬 AI Agent says: ${message}`);
        return { content: [{ type: "text", text: `Instruction sent: Display \"${message}\"` }] };
    }
);

// --- TOOL 5: RANDOM FACT ---
myServer.tool(
    "myGetRandomFact",
    { type: "object", properties: {} },
    async () => {
        const facts = [
            "Octopuses have 3 hearts.",
            "Honey never spoils.",
            "Bananas are berries."
        ];
        const fact = facts[Math.floor(Math.random() * facts.length)];
        return { content: [{ type: "text", text: fact }] };
    }
);

// --- HEALTH CHECK SERVER ---
const myHealthPort = 3000;

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "online", message: "Bridge is active!" }));
}).listen(myHealthPort, () => {
    console.error("-------------------------------------------");
    console.error(`🚀 WebMCP Bridge started on port ${myHealthPort}`);
    console.error(`✅ Dashboard link: http://localhost:${myHealthPort}`);
    console.error("⌨️  Type 'count' and press Enter to ping the dashboard!");
    console.error("-------------------------------------------");
});

// --- TERMINAL INPUT ---
process.stdin.on("data", (data) => {
    const input = data.toString().trim().toLowerCase();
    if (input === "count") {
        console.error("⚡ Manual Trigger: Sending count ping to dashboard...");
    } else if (input === "exit") {
        process.exit();
    }
});

// --- CONNECT MCP ---
const transport = new StdioServerTransport();
myServer.connect(transport);
