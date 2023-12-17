module.exports = function (app, forumData) {
  app.get("/", function (req, res) {
    res.render("logIn.ejs", forumData);
  });
  //for redirection to home once in
  app.get("/home", function (req, res) {
    res.render("home.ejs", { forumData: forumData });
  });
  //username and password query
  app.post("/home", function (req, res) {
    let sqlquery = "SELECT * FROM user WHERE email = ? AND password = ?";
    let newuser = [req.body.email, req.body.password];

    //sql query that returns all names under topic
    let topicquery = "SELECT * FROM topic";
    db.query(topicquery, (err, result) => {
      if (err) {
        return console.error(err.message);
      } else {
        forumData = Object.assign({}, forumData, { topic: result });
      }
    });
    //sql query that checks if user exists in db and otherwise is redirected
    db.query(sqlquery, newuser, (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      if (result.length > 0) {
        res.render("home.ejs", { forumData: forumData });
      } else {
        res.redirect("/");
      }
      res.end();
    });
  });
  //
  app.get("/register", function (req, res) {
    res.render("register.ejs", forumData);
  });
  app.post("/registered", function (req, res) {
    // saving data in database
    let sqlquery =
      "INSERT INTO user (firstname, lastname, email, password) VALUES (?,?,?,?)";
    let newrecord = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
    ];
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        return console.error(err.message);
      } else {
        res.render("registered.ejs", forumData);
      }
    });
  });
  //
  app.get("/about", function (req, res) {
    res.render("about.ejs", forumData);
  });
  //route handler for user tab
  app.get("/users", (req, res) => {
    let selectUsersQuery = "SELECT firstname, lastname FROM user";
    db.query(selectUsersQuery, (err, result) => {
      if (err) {
        console.error("Failed to fetch users:", err);
      } else {
        let forumData = {
          forumName: "ChatHaven",
          users: result, // Add data data forumData object
        };

        res.render("users.ejs", { forumData });
      }
    });
  });
  //route handler for topics tab
  app.get("/topics", (req, res) => {
    let selectTopicsQuery = "SELECT name FROM topic";
    db.query(selectTopicsQuery, (err, result) => {
      if (err) {
        console.error("Failed to fetch topics:", err);
      } else {
        let forumData = {
          forumName: "ChatHaven",
          topics: result, // Add data data forumData object
        };

        res.render("topics.ejs", { forumData });
      }
    });
  });
};
