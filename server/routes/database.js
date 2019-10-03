module.exports = function(db, app) {
  //DONE
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

  //DONE
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
      if (count == 0) {
        collection.insertOne(user);
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });

  //DONE
  app.post("/api/addgroup", function(req, res) {
    group = {};
    group.name = req.body.groupname;
    group.channels = [];
    group.group_assis = [];

    const collection = db.collection("groups");

    collection.find({ name: group.name }).count((err, count) => {
      if (count == 0) {
        collection.insertOne(group);
        res.send(true);
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

    collection
      .find({
        name: groupname,
        channels: { $elemMatch: { $gte: channelname } }
      })
      .count((err, count) => {
        if (count == 0) {
          console.log("channel not in group");
        } else {
          console.log("Channel already in group");
        }
      });
  });

  //DONE
  app.get("/api/getgroups", function(req, res) {
    const collection = db.collection("groups");
    collection.find({}).toArray(function(err, data) {
      res.send(data);
    });
  });

  //DONE
  app.get("/api/getusers", function(req, res) {
    const collection = db.collection("users");

    userlist = [];
    collection.find({}).toArray(function(err, data) {
      res.send(data);
    });
  });

  app.get("/api/getalluserdata", function(req, res) {
    const collection = db.collection("users");
    users = [];
    collection.find({}).toArray(function(err, data) {
      res.send(data.users);
    });
  });

  //DONE
  app.post("/api/getusergroups", function(req, res) {
    const collection = db.collection("users");

    username = req.body.username;

    collection.find({ username: username }).toArray(function(err, data) {
      res.send(data[0].groups);
    });
  });

  //DONE
  app.post("/api/addgrouptouser", function(req, res) {
    newgroup = {};
    newgroup.name = req.body.inviteGroupName;
    newgroup.channels = [];
    username = req.body.inviteGroupUsername;

    collection = db.collection("users");

    collection.findOneAndUpdate(
      { username: username },
      { $push: { groups: newgroup } },
      function(err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      }
    );
  });

  app.post("/api/deleteuser", function(req, res) {
    user = req.body.deleteUserName;

    const collection = db.collection("users");

    collection.deleteOne({ username: user });
    res.send(true);
  });

  //FIX
  app.post("/api/removeuserfromchannel", function(req, res) {
    collection = db.collection("users");

    user = req.body.removeChannelUserName;
    group = req.body.removeChannelGroupName;
    channel = req.body.removeChannelFromUser;

    collection.findOneAndUpdate({username: user}, {$pull: {"groups": {name: group, channels: channel}}})
  });

  //DONE
  app.post("/api/removeuserfromgroup", function(req, res) {
    user = req.body.deleteGroupFromUser;
    group = req.body.deleteGroupFromUserGroup;

    collection = db.collection("users");

    collection.findOneAndUpdate({username: user}, {$pull: { "groups": {name: group}}}, function(err, data) {
      if(err){
        console.log(err)
      } else {
        console.log("Deleted successfully");
        res.send(data);
      };
    });
  });

  //FIX ROUTE
  app.post("/api/deletechannel", function(req, res) {
    groupcollection = db.collection("groups");
    usercollection = db.collection("users");

    channel = req.body.deleteChannelName;
    group = req.body.deleteChannelGroupName;

    groupcollection.findOneAndUpdate({'name': group}, { $pull: {'channels': channel}}, function(err, data) {
      if(err) {
        console.log(err)
      } else {
        res.send(data)
      }
    });

    usercollection.updateMany({'groups.name': group}, {$pull: {'groups.$.channels': channel}}, function(err, data) {
      if(err) {
        console.log(err);
      } else {
        res.send(data);
      }
    })
  });

  //DONE
  app.post("/api/deletegroup", function(req, res) {
    collection = db.collection("groups");
    users = db.collection("users");

    group = req.body.deleteGroupName;

    collection.deleteOne({ name: group }, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        console.log("Document deleted");
      }
    });

    users.findOneAndUpdate({}, {$pull: {"groups": {name: group}}}, function(err, data) {
      if(err) {
        console.log(err);
      }
    })
    res.send(true);
  });

  app.post("/api/getgroupassis", function(req, res) {});
};
