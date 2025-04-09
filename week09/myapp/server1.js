// server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

console.log("🚀 Node.js server configured successfully!");

// === Callback Example ===
function greetUser(name, callback) {
    console.log(`👋 Hello, ${name}!`);
    callback();
}

greetUser("Aron", () => {
    console.log("✅ Callback executed: User greeted.");
});

// === REPL-simulated behavior ===
fs.writeFile('repl_output.txt', 'This file simulates REPL write output.', (err) => {
    if (err) console.error("❌ Error writing REPL simulation file:", err);
    else console.log("📄 File 'repl_output.txt' created (REPL simulation).");
});

// === Create Server ===
const server = http.createServer((req, res) => {
    console.log(`📥 Request received: ${req.url}`);

    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    const ext = path.extname(filePath);
    let contentType = 'text/html';

    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
    }

    // === Async file reading with callback ===
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

// === Start Server ===
server.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
