// nodejs_complete_demo.js

// ✅ 1. CONFIGURATION DEMO
console.log("🚀 Node.js is installed and configured properly!");

// ✅ 2. CALLBACK EXAMPLE
function fetchDataFromDatabase(callback) {
    console.log("⏳ Fetching data from database (simulated)...");
    setTimeout(() => {
        const data = { name: "Aron", course: "Node.js" };
        console.log("✅ Data fetched!");
        callback(data);
    }, 2000); // simulate delay
}

function processFetchedData(data) {
    console.log("📦 Processing Data:");
    console.log(`Name: ${data.name}, Course: ${data.course}`);
}

fetchDataFromDatabase(processFetchedData);

// ✅ 3. FILE SYSTEM CALLBACK + REPL-LIKE USAGE
const fs = require('fs');

// Writing to a file using callback (non-blocking I/O)
fs.writeFile('demo.txt', 'Hello from Node.js!', (err) => {
    if (err) {
        console.error("❌ Failed to write file:", err);
    } else {
        console.log("✅ File 'demo.txt' has been written!");

        // REPL-like read (simulate REPL)
        fs.readFile('demo.txt', 'utf8', (err, data) => {
            if (err) {
                console.error("❌ Failed to read file:", err);
            } else {
                console.log("📄 REPL-Simulated Output:");
                console.log(data);
            }
        });
    }
});
