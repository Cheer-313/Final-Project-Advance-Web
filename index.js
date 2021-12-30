// Require .env
require("dotenv").config();

// Require modules
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const http = require("http");
const socketio = require("socket.io");
const division = require("./const/role");
const expressLayouts = require("express-ejs-layouts");
const moment = require("moment");

// Require route
const indexRoute = require("./routes/IndexRoute");
const loginRoute = require("./routes/LoginRoute");
const registerRoute = require("./routes/RegisterRoute");
const profileRoute = require("./routes/ProfileRoute");
const apiRoute = require("./routes/api/APIRoute");
const notiRoute = require('./routes/NotificationRoute');

// Require Database
const db = require("./database/db");

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);

// Config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/tinymce",express.static(path.join(__dirname, "/node_modules/tinymce/")));
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: '5180076907771039'
}));
app.use(flash());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
    })
); 
app.use(passport.initialize());
app.use(passport.session());
app.use(expressLayouts);

// Set default layout
app.set("layout", "./layouts/layout");

// Set io available in all request handlers
app.set("socketio", io);

// Set division role to all route
app.use((req, res, next) => {
    res.locals.division = division;
    return next();
});

// Set info user to all route
app.use((req, res, next) => {
    res.locals.user = req.user;
    return next();
});

// Set moment to all routes
app.use((req, res, next) => {
    res.locals.moment = moment;
    return next();
});

// Route
app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/profile", profileRoute);
app.use("/api", apiRoute);
app.use("/noti", notiRoute);

// custom 404 page
app.use((req, res) => {
    return res.status(404).send("<h1>404! Page not found</h1>");
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.end("500 ERROR SERVER");
})

server.listen(PORT, async () => {
    await db.connection;
    console.log(`Server is running on http://localhost:${PORT}`);
});
