// cannot import the statement we need to add "type": "module", in the pacakge.json file
// for nodemon we need just npm start
import express, { json } from "express"; 
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
});

// If any case have auth problem
// ALTER  USER 'root'@'localhost'  IDENTIFIED WITH mysql_native_password BY 'Your Password'

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

app.get("/", (req, res) => {
    res.json("Hello, this is the backend... I hope this is working...");
});

// This are the request which we get from database

// Get request
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"; // get query
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Post request
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values = ["Harry Porter 2", "Desc for it is very much random done by first post request", "Pic ffrom DB"]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, () => {
    console.log("Connected to backend... Please test");
});
