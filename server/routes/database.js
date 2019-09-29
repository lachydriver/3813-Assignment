module.exports = function(db, app) {
  app.post("/api/login", function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }

    username = req.body.inputUsername;
    password = req.body.inputPassword;

    user = {};
    user.valid = null

    console.log(username);
    console.log(password)

    const collection = db.collection("users");

    collection.findOne({ username: username }, function(err, data) {
        if(!data){
            return res.status(404).json({usernamenotfound: "Username not found"})
        }

        if(password === data.password){
            user.valid = true;
            user.username = username;
            user.role = data.role;
            console.log("username found");
            res.json(user);
        } else {
            user.valid = false;
            res.json(user);
        }
    });
  });
};
