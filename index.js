// Require .env
require("dotenv").config();

// Require modules
const express = require("express");
const path = require("path");
const session = require("express-session");

// Require route
const indexRoute = require("./routes/IndexRoute");
const loginRoute = require("./routes/LoginRoute");

// Require Database
const db = require("./database/db");

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'OlalaOlala'
}))

// Route
app.use("/", indexRoute);
app.use("/login", loginRoute);

app.listen(PORT, async () => {
    await db.connection;
    console.log(`Server is running on http://localhost:${PORT}`);
});
