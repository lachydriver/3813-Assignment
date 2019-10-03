module.exports = function(db, app) {
  
  //Login Route
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

    //Find username, check if the password matches the current user.
    //if yes, send the user object with true attached
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

  //Add user route
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

    //Check if the user already exists in the database with the same username, if not, add the user to the database
    collection.find({ username: user.username }).count((err, count) => {
      if (count == 0) {
        collection.insertOne(user);
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });

  //Add Group
  app.post("/api/addgroup", function(req, res) {
    group = {};
    group.name = req.body.groupname;
    group.channels = [];
    group.group_assis = [];

    const collection = db.collection("groups");

    //Check if a group with the same name already exists, if not add the group to the database
    collection.find({ name: group.name }).count((err, count) => {
      if (count == 0) {
        collection.insertOne(group);
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });

  //Add Channel
  app.post("/api/addchannel", function(req, res) {
    groupname = req.body.inputGroup;
    channelname = req.body.inputChannel;

    const collection = db.collection("groups");

    //Check if the channel exists in the group it is being added to, if not, add the channel and return 'true' to the Angular app.
    collection.find({'name': groupname, 'channels': { $elemMatch:  { $in: [channelname] }}})
      .count((err, count) => {
        if (count == 0) {
          collection.findOneAndUpdate({'name': groupname}, {$push: {'channels': channelname}});
          res.send(true);
        } else {
          console.log("Channel already in group");
          res.send(false);
        }
      });
  });

  //Get Groups
  //return an array of all the groups in the groups collection within the database
  app.get("/api/getgroups", function(req, res) {
    const collection = db.collection("groups");
    collection.find({}).toArray(function(err, data) {
      res.send(data);
    });
  });

  //Get users
  //return an array with all of the users in the users collection within the database
  app.get("/api/getusers", function(req, res) {
    const collection = db.collection("users");

    userlist = [];
    collection.find({}).toArray(function(err, data) {
      res.send(data);
    });
  });

  //Get user data
  //Return information about the users in an array
  app.get("/api/getalluserdata", function(req, res) {
    const collection = db.collection("users");
    users = [];
    collection.find({}).toArray(function(err, data) {
      res.send(data.users);
    });
  });

  //Get User Groups
  //Get the groups that each user is subscribed to
  app.post("/api/getusergroups", function(req, res) {
    const collection = db.collection("users");

    username = req.body.username;

    collection.find({ username: username }).toArray(function(err, data) {
      res.send(data[0].groups);
    });
  });

  //Add group to user
  app.post("/api/addgrouptouser", function(req, res) {
    newgroup = {};
    newgroup.name = req.body.inviteGroupName;
    newgroup.channels = [];
    username = req.body.inviteGroupUsername;

    collection = db.collection("users");

    //Find the username and add the group to the user being sent in the request, return the data from the search
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

  //Delete user
  app.post("/api/deleteuser", function(req, res) {
    user = req.body.deleteUserName;

    const collection = db.collection("users");
    //Find the username passed in the request and delete the whole object in the database
    collection.deleteOne({ username: user });
    res.send(true);
  });

  //Remove user from channel
  app.post("/api/removeuserfromchannel", function(req, res) {
    collection = db.collection("users");

    user = req.body.removeChannelUserName;
    group = req.body.removeChannelGroupName;
    channel = req.body.removeChannelFromUser;

    //Find the user, and delete the channel from the group sent in the request
    collection.findOneAndUpdate({username: user, 'groups.name': group}, {$pull: {'groups.$.channels': channel}}, function(err, data) {
      if(err) {
        console.log(err)
      } else {
        res.send(data)
      }
    })
  });

  //Add a user to the group
  app.post("/api/addusertochannel", function(req, res) {
    username = req.body.inviteUsername;
    group = req.body.inviteGroup;
    channel = req.body.inviteChannel;

    collection = db.collection("users");

    collection.find({'username': username, 'groups':{$elemMatch: {"name": group, "channels": channel}}}).count((err, count) => {
      if(err) {
        console.log(err)
      } else if (count == 0) {
        collection.findOneAndUpdate({username: username, 'groups.name': group}, {$push: {"groups.$.channels": channel}})
        res.send(true)
      } else {
        res.send(false)
      }
    })
  })

  //Remove user from group
  app.post("/api/removeuserfromgroup", function(req, res) {
    user = req.body.deleteGroupFromUser;
    group = req.body.deleteGroupFromUserGroup;

    collection = db.collection("users");

    //Find username and delete the group from their group array object
    collection.findOneAndUpdate({username: user}, {$pull: { "groups": {name: group}}}, function(err, data) {
      if(err){
        console.log(err)
      } else {
        console.log("Deleted successfully");
        res.send(data);
      };
    });
  });

  //Delete channel
  app.post("/api/deletechannel", function(req, res) {
    groupcollection = db.collection("groups");
    usercollection = db.collection("users");

    channel = req.body.deleteChannelName;
    group = req.body.deleteChannelGroupName;

    //Find the channel and delete it from the group collection
    groupcollection.findOneAndUpdate({'name': group}, { $pull: {'channels': channel}}, function(err, data) {
      if(err) {
        console.log(err)
      } else {
        console.log("Deleted channel")
      }
    });

    //find if any users have the channel in their groups and delete it from the groups channels array
    usercollection.updateMany({'groups.name': group}, {$pull: {'groups.$.channels': channel}}, function(err, data) {
      if(err) {
        console.log(err);
      } else {
        console.log("Deleted channel from user")
      }
    })
  });

  //Delete group
  app.post("/api/deletegroup", function(req, res) {
    collection = db.collection("groups");
    users = db.collection("users");

    group = req.body.deleteGroupName;

    //Delete the group from the groups collection
    collection.deleteOne({ name: group }, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        console.log("Document deleted");
      }
    });

    //Delete the group from any users that were subscribed to it
    users.findOneAndUpdate({}, {$pull: {"groups": {name: group}}}, function(err, data) {
      if(err) {
        console.log(err);
      }
    })
    res.send(true);
  });

  app.post("/api/getgroupassis", function(req, res) {});
};
