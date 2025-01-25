const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (CSS, images, JavaScript)
app.use(express.static('public'));

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to display the subscription form
app.get('/', (req, res) => {
    res.render('form');
});

// Route to handle form submission
app.post('/post-subscribe', (req, res) => {
    const { name, email } = req.body;

    // Basic validation for server-side
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required.' });
    }

    const query = `INSERT INTO subscribers (name, email) VALUES (?, ?)`;

    db.run(query, [name, email], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Error inserting data', error: err.message });
        }

        // Respond with success
        res.status(200).json({
            message: `Thank you for subscribing, ${name}!`,
            email,
        });
    });
});

// Connect to SQLite database
const db = new sqlite3.Database('./subscribers.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS subscribers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )`);
    }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
