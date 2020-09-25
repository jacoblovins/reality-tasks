// // Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const isAuth = require("../config/middleware/isAuthenticated");
// const user = require("../models/user");

module.exports = function(app) {
  //   // Using the passport.authenticate middleware with our local strategy.
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      username: req.body.username,
      id: req.body.id
    });
  });
  //   // Route for signing up a user.
  app.post("/api/signup", (req, res) => {
    db.Members.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log(err);

        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //   // Route for getting some data about our user to be used client side
  app.get("/api/user_data", isAuth, (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });

  app.get("/api/tasks/:place", isAuth, (req, res) => {
    // fetch todos from DB by req.user.id
    db.Task.findAll({
      include: [{ model: db.Members }],
      where: {
        taskType: req.params.place,
        MemberId: req.user.id
      }
    }).then(dbTask => {
      res.json(dbTask);
    });
  });

  app.post("/api/tasks", async (req, res) => {
    await db.Task.create(req.body).then(dbTask => {
      res.json(dbTask);
    });
  });

  app.delete("/api/tasks/:id", (req, res) => {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbTask => {
      res.json(dbTask);
    });
  });
};
