const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 3000;

// Enable CORS for cross-origin requests
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
    host: '192.168.255.198',        // Your MySQL host
    user: 'aaa',             // Your MySQL username
    password: '123456',             // Your MySQL password
    database: 'dbapi' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to the database');
});
app.get('/keng',(req,res)=>{
    try {
        return res.send('KKK')
    } catch (error) {
        return res.status(500).send('Error')
    }
})

// Endpoint to get the username
app.get('/get-username', (req, res) => {
    // Query to select a username from the user table (adjust according to your schema)
    const query = 'SELECT username FROM user';  // You can modify this to select the user you want
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching username:', err);
            res.status(500).send({ message: 'Database error' });
            return;
        }
        
        if (results.length > 0) {
            res.json({ username: results[0].username }); // Send the username back to the client
        } else {
            res.json({ username: null });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
