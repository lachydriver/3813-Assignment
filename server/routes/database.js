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
        res.send(true);
      } else {
        res.send(false);
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
        res.send(true)
      } else {
        res.send(false);
      }
    });
  });

  //FIX THIS ROUTE
  app.post("/api/addchannel", function(req, res) {
    groupname = req.body.inputGroup;
    channelname = req.body.inputChannel;

    const collection = db.collection("groups");

    collection.find({name: groupname, channels: {$elemMatch: {$gte: channelname}}}).count((err, count) => {
      if(count == 0){
        console.log("channel not in group")
      } else {
        console.log("Channel already in group")
      }
    })
  });

  app.get("/api/getgroups", function(req, res) {
    const collection = db.collection("groups");
    collection.find({}).toArray(function(err, data) {
      res.send(data);
    })
  });

  app.post("/api/getusergroups", function(req, res) {
    const collection = db.collection("users");

    
  })


};
