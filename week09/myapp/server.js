// nodejs_demo.js

console.log("✅ Node.js setup is working!");

// === 1. Function Callback Example ===
function greetUser(name, callback) {
    console.log(`👋 Hello, ${name}!`);
    callback();
}

function sayBye() {
    console.log("👋 Goodbye!");
}

greetUser("Aron", sayBye);

// === 2. File System Operations with Callbacks ===
const fs = require('fs');

// Write to a file asynchronously
fs.writeFile('message.txt', 'Hello from Node.js using callbacks!', (err) => {
    if (err) {
        console.error("❌ Error writing to file:", err);
        return;
    }
    console.log("✅ File 'message.txt' written successfully.");

    // Now read from the file
    fs.readFile('message.txt', 'utf8', (err, data) => {
        if (err) {
            console.error("❌ Error reading file:", err);
            return;
        }
        console.log("📄 File content:");
        console.log(data);
    });
});

// === 3. REPL-Like Behavior as Script ===
setTimeout(() => {
    const replData = "This simulates REPL behavior via script.";
    fs.writeFile('repl-sim.txt', replData, (err) => {
        if (err) {
            console.error("❌ Error writing REPL file:", err);
        } else {
            console.log("✅ REPL-like file 'repl-sim.txt' created.");
        }
    });
}, 2000);
