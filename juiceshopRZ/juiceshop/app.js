// Import
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

const appRouter = require("./routes/appRouter");

// Connect to database
const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(uri)
    .then(() => { console.log(`Connect to database!`) })
    .catch((error) => { console.log(error.message) });

// Create an app
const app = express();
const port = 8080;

// Set up static folder, body parser, session, view engine
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: "juiceshop-7777777",
    resave: false,
    saveUninitialized: true
}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.use("/", appRouter);

// Run the web app
app.listen(port, () => {
    console.log(`App http://localhost:${port}`);
});
