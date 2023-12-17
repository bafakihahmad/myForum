// Import express and ejs
// In a node.js environment, modules are imported using the require
// function as opposed to modern JavaScript (ES6 and later), that use
// the import and export keywords
var express = require("express");
var ejs = require("ejs");
var path = require("path");
var bodyParser = require("body-parser");
var mysql = require("mysql");
// Create the express application object, used to configure
// routes, middleware, and other settings
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
//Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "appuser",
  password: "app2027",
  database: "myForum",
});
// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.db = db;
//Page data
var forumData = {
  forumName: "ChatHaven",
  topic: [],
};
//configuration
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set("views", __dirname + "/views");
// Tell Express that we want to use EJS as the templating engine
app.set("view engine", "ejs");
// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine("html", ejs.renderFile);
// Handle the routes
require("./routes/main")(app, forumData);
// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
