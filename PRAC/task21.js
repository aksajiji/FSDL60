//REST API for BookstoreCreate a Node.js/Express API with GET/POST endpoints for managing a list of books (title, author).Use Postman to test
// index.js

// 1. Import the Express module
const express = require('express');

// 2. Create an Express application
const app = express();

// 3. Define a port number (you can change it)
const PORT = 3000;

// 4. Use express.json() middleware to parse JSON request bodies
app.use(express.json());

// 5. In-memory array to store books (acting as a temporary database)
let books = [];

// 6. GET route to retrieve all books
app.get('/api/books', (req, res) => {
    res.json(books); // Respond with the array of books in JSON format
});

// 7. POST route to add a new book
app.post('/api/books', (req, res) => {
    const { title, author } = req.body; // Extract title and author from the request body

    if (!title || !author) {
        // If title or author is missing, send a 400 (Bad Request) response
        return res.status(400).json({ message: 'Title and author are required' });
    }

    // Create a new book object
    const newBook = { id: books.length + 1, title, author };

    // Add the new book to the array
    books.push(newBook);

    // Respond with a success message and the added book
    res.status(201).json({ message: 'Book added successfully', book: newBook });
});

// 8. Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
