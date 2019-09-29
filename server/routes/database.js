module.exports = function(db, app) {
  app.post("/api/login", function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }

    user = req.body;

    console.log(user.username);
    user.valid = null;

    const collection = db.collection("users");

    collection.findOne({ username: user.username }, function(err, data) {
      console.log(data);
      if (user.password === data.password) {
        res.json("user login accepted");
      } else {
        res.json("not accepted");
      }
    });
  });
};
