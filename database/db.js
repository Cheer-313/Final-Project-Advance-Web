const mongoose = require('mongoose');
const credential = require("./creadential");

// Check connection string
const connectionString = process.env.CONNECT_STRING || credential.mongo.connectionStringAtlas;
if (!connectionString) {
    console.error("MongoDB connection string missing!");

    process.exit(1);
}

console.log(connectionString)

// Connect to database
function connectDatabase() {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    console.log(db);
    db.on("error", (err) => {
        console.error("MongoDB error: " + err.message);

        process.exit(1);
    });
    db.once("open", () => console.log("MongoDB connection established"));
    return db;
}
const connection = connectDatabase();

module.exports = connection;
