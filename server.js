const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "auto_bazaar"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
        return;
    }

    console.log("MySQL connected successfully!");
});

// Test backend connection
app.get("/", (req, res) => {
    res.send("ARSHAD'S AUTO BAZAAR Backend is running!");
});

// Get all vehicles from MySQL
app.get("/api/vehicles", (req, res) => {
    db.query("SELECT * FROM vehicles", (err, results) => {
        if (err) {
            console.error("SQL error:", err.message);

            return res.status(500).json({
                error: "Failed to fetch vehicles"
            });
        }

        res.json(results);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});