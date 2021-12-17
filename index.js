// Require .env
require("dotenv").config();

// Require modules
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

// Require route
const indexRoute = require("./routes/IndexRoute");
const loginRoute = require("./routes/LoginRoute");
const registerRoute = require("./routes/RegisterRoute");

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
}));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
    })
); 
app.use(passport.initialize());
app.use(passport.session());
// Route
app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.listen(PORT, async () => {
    await db.connection;
    console.log(`Server is running on http://localhost:${PORT}`);
});
