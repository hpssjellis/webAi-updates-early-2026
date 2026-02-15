# webAi-updates-early-2026
webAi-updates-early-2026



index.html page at  https://hpssjellis.github.io/webAi-updates-early-2026/index.html



My Web AI & MCP Local Toolkit
This project demonstrates how to run local AI models and WebMCP agents using only Node.js and a standard web browser. No cloud hosting or external platforms are required.

📋 Project Structure
index.html - The main dashboard with a live server status check.

mcp_demo.html - The "Agent-Ready" page with the visitor counter tool.

yolo_demo.html - Local Vision AI (Object Detection).

vector_search.html - Semantic search using local embeddings.

myServer.js - The Node.js bridge that connects AI Agents to your browser.

🚀 Setup Instructions
1. Install Node.js Dependencies
Open your terminal in this project folder and run:


```
npm init -y
```

```
npm install @modelcontextprotocol/sdk
```

2. Start the Local MCP Bridge
This server allows AI Agents to "talk" to your static webpages.


```
node myServer.js
```
Note: Keep this terminal window open! It also hosts a health check on http://localhost:3000 so the dashboard can see it.

3. Open the Dashboard
Simply open index.html in any modern web browser (Chrome or Edge recommended).

If myServer.js is running, you will see a Green Status Dot on the dashboard.

You can now navigate to the different AI modules.

🛠️ How to use with an AI Agent (Claude Desktop)
To let an AI Agent actually click the buttons on your page, add this to your claude_desktop_config.json:

JSON
{
  "mcpServers": {
    "my-student-tools": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/YOUR/myServer.js"]
    }
  }
}
Replace /ABSOLUTE/PATH/TO/YOUR/ with the actual folder path on your computer.

🧠 How it Works
The Browser handles the heavy lifting for AI (Vision & Search) using WebGPU.

The Node.js Server acts as a "translator." It doesn't process images; it just passes messages from the AI Agent to the browser.

WebMCP allows the AI to execute functions like myCountVisitor() directly within your static HTML.

⚠️ Troubleshooting
Status is "Offline": Ensure you ran node myServer.js and that no other program is using port 3000.

Vision AI not loading: Ensure your browser supports WebGPU (Check chrome://flags if it fails).

CORS Errors: The myServer.js is configured to allow all local origins, but ensure you are accessing the page via localhost or a local file path.
