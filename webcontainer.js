import { WebContainer } from 'https://cdn.jsdelivr.net/npm/@webcontainer/api/+esm';

let wc;

export async function myRunNodeContainer() {
    const term = document.getElementById('myTerminal');
    const btn = document.getElementById('myBtn');

    function log(msg) {
        term.innerText += `\n${msg}`;
        term.scrollTop = term.scrollHeight;
    }

    btn.disabled = true;
    term.innerText = "Status: Booting WebContainer...";

    try {
        if (!wc) wc = await WebContainer.boot();

        const files = {
            'myIndex.js': {
                contents: `
                    console.log("Hello from inside the Node container!");
                    console.log("Current Time:", new Date().toLocaleTimeString());
                `
            }
        };

        await wc.mount(files);
        log("Status: Files mounted. Running 'node myIndex.js'...");

        const proc = await wc.spawn('node', ['myIndex.js']);

        proc.output.pipeTo(new WritableStream({
            write(data) { log("> " + data); }
        }));

        proc.stderr.pipeTo(new WritableStream({
            write(data) { log("ERR: " + data); }
        }));

        const exitCode = await proc.exit;
        log(`Process finished with exit code: ${exitCode}`);

    } catch (err) {
        log("Error: " + err.message);
        log("Note: COOP/COEP headers are required for WebContainers.");
    } finally {
        btn.disabled = false;
    }
}

window.myRunNodeContainer = myRunNodeContainer;
