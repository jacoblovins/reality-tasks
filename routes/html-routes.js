// // Requiring path to so we can use relative routes to our HTML files
const path = require("path");
// // Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    //If the user already has an account send them to the members page
    if (req.body.members) {
      res.redirect("/app");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
    console.log(req);
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the login page
    if (req.body.members) {
      res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
    console.log(req);
  });
  //   // Here we've add our isAuthenticated middleware to this route.
  //   // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/todo", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/todo.html"));
  });
  app.get("/app", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/app.html"));
  });
};
