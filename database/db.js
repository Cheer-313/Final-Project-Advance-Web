const mongoose = require('mongoose');
const credential = require("./creadential");

// Check connection string
const connectionString = credential.mongo.connectionString;
if (!connectionString) {
    console.error("MongoDB connection string missing!");

    process.exit(1);
}

// Connect to database
function connectDatabase() {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", (err) => {
        console.error("MongoDB error: " + err.message);

        process.exit(1);
    });
    db.once("open", () => console.log("MongoDB connection established"));
    return db;
}
const connection = connectDatabase();

module.exports = connection;
