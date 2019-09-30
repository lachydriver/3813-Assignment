module.exports = function(db, app) {
  app.post("/api/login", function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }

    username = req.body.inputUsername;
    password = req.body.inputPassword;

    user = {};
    user.valid = null;

    console.log(username);
    console.log(password);

    const collection = db.collection("users");

    collection.findOne({ username: username }, function(err, data) {
      if (!data) {
        return res.json(user);
      }

      if (password === data.password) {
        user.valid = true;
        user.username = username;
        user.role = data.role;
        res.json(user);
      } else {
        user.valid = false;
        res.json(user);
      }
    });
  });

  app.post("/api/adduser", function(req, res) {
    user = {};

    if (!req.body) {
      return res.sendStatus(400);
    }

    valid = true;

    const collection = db.collection("users");

    user.username = req.body.inputUsername;
    user.role = req.body.inputRole;
    user.email = req.body.inputEmail;
    user.password = req.body.inputPassword;
    user.groups = [{}];

    collection.find({ username: user.username }).count((err, count) => {
      if(count == 0){
        collection.insertOne(user);
        res.json(user);
      } else {
        res.send({error: 'user already exists'})
      }
    });
  });

  app.post("/api/addgroup", function(req, res) {
    group = {};
    group.name = req.body.groupname;
    group.channels = [];
    group.group_assis = [];

    const collection = db.collection("groups");

    collection.find({name: group.name}).count((err, count) => {
      if(count == 0){
        collection.insertOne(group);
        res.json(group)
      } else {
        res.send({error: 'group already exists'});
      }
    })
  })
};
