const fs = require("fs");

module.exports = function(app){
    app.post("/api/login", function(req, res) {
        var rawdata = fs.readFileSync("users.json", "utf8");
        var data = JSON.parse(rawdata);
        user = {};
      
        user.username = req.body.inputUsername;
        user.valid = null;
      
        console.log(data.users[0].username);
        for (i = 0; i < data.users.length; i++) {
          console.log(data.users[i].username);
          console.log(user.username)
          if (user.username === data.users[i].username) {
            user.valid = true;
            user.role = data.users[i].role;
            user.groupAdminRole = data.users[i].groupAdminRole;
            break;
          } else {
            user.valid = false;
          }
        }
        res.send(user);
      });
      
      app.post("/api/adduser", function(req, res) {
        var rawdata = fs.readFileSync("users.json", "utf8");
      
        var thisdata = JSON.parse(rawdata);
        user = {};
      
        user.username = req.body.inputUsername;
        user.role = req.body.inputRole;
        user.groups = [];
      
        thisdata.users.push(user);
        console.log(thisdata);
        var newdata = JSON.stringify(thisdata);
        console.log(newdata);
        fs.writeFile("users.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        });
      
        res.send(user);
      });

      app.post("/api/addgroup", function(req,res) {
        var rawdata = fs.readFileSync("users.json", "utf8");
        var thisdata = JSON.parse(rawdata);

        group = {}
        group.name = req.body.groupname;
        group.channels = [];

        thisdata.groups.push(group);
        var newdata = JSON.stringify(thisdata);
        fs.writeFile("users.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
      });

      app.post("/api/addchannel", function(req, res) {
        var rawdata = fs.readFileSync("users.json", "utf8");
        var data = JSON.parse(rawdata);

        groupname = req.body.inputGroup;
        channelname = req.body.inputChannel;

        console.log(groupname + channelname)
        

        for(i=0; i < data.groups.length; i++){
          console.log(data.groups[i].name + " " + groupname)
          if(groupname === data.groups[i].name){
            console.log(data.groups[i].name)
            data.groups[i].channels.push(channelname)
          }
        }
        console.log(data.groups)
        var newdata = JSON.stringify(data);
        fs.writeFile("users.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
        res.send(data)
      })

      app.get("/api/getgroups", function(req, res) {
        var rawdata = fs.readFileSync("users.json", "utf8");
        var thisdata = JSON.parse(rawdata);

        data = thisdata.groups;
        console.log(data)
        res.send(data);
      });

      app.get("/api/getusergroups", function(req, res){
        var rawdata = fs.readFileSync("users.json", "utf8");
        var data = JSON.parse(rawdata);

        username = req.body.username

        for(i= 0; i < data.users.length; i++){
          if(username === data.users[i].username){
            userdata = data.users[i]
          } else {
            res.send(false);
          }
        }
        res.send(userdata)
      });

      app.get("/api/getusers", function(req, res) {
        var rawdata = fs.readFileSync("users.json", "utf8");
        var data = JSON.parse(rawdata);
        userdata = data.users
        userlist = [];
        for(i = 0; i < userdata.length; i++){
          userlist.push(userdata[i].username)
        }
        res.send(userlist)        
      })

      app.post("/api/addgrouptouser", function(req, res){
        var rawdata = fs.readFileSync("users.json", "utf8");
        var data = JSON.parse(rawdata);

        newgroup = {};
        newgroup.name = req.body.inviteGroupName;
        newgroup.channels = [];
        username = req.body.inviteGroupUsername;


        for(i = 0; i < data.users.length; i++){
          if(username === data.users[i].username){
            console.log("MATCHED USERNAME")
            data.users[i].groups.push(newgroup);
          }
        }
        var newdata = JSON.stringify(data);
      fs.writeFile("users.json", newdata, function(err) {
        if (err) {
          console.log(err);
        }
      })
      res.send(data)
      });

      
      app.post("/api/deleteuser", function(req, res){
        var rawdata = fs.readFileSync("users.json", "utf8");
        var data = JSON.parse(rawdata);

        user = req.body.deleteUser;

        for(i = 0; i < data.users.length; i++){
          if(user === data.users[i].username){
            data.users.splice(i, 1);
          }
        }
        var newdata = JSON.stringify(data);
        fs.writeFile("users.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
        res.send(data);
      });

      app.post("/api/removeuserfromchannel", function(req, res){
        var rawdata = fs.readFileSync("users.json", "utf8");
        var data = JSON.parse(rawdata);

        user = req.body.deleteChannelUser;
        group = req.body.deleteGroupChannelUser;
        channel = req.body.removeChannelFromUser;

        for(i = 0; i < data.users.length; i++){
          if(user === data.users[i].username){
          for(x = 0; x < data.users[i].groups.length; x++){
            if(group === data.users[i].groups[x].name){
              for(y = 0; y < data.users[i].groups[x].channels.length; y++){
                if(channel === data.users[i].groups[x].channels[y]){
                  data.users[i].groups[x].channels.splice(y, 1);
                }
              }
            }
          }
          }
        }
        var newdata = JSON.stringify(data);
        fs.writeFile("users.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
        res.send(data)
      })

      app.post("/api/deletechannel", function(req, res){
        var rawdata = fs.readFileSync("users.json", "utf8");
        var data = JSON.parse(rawdata);

        channel = req.body.deleteChannel;
        group = req.body.deleteChannelGroup;

        for(i = 0; i < data.groups.length; i++){
          if(group === data.groups[i].name){
            for(y = 0; y < data.groups[i].channels.length; y++){
              if(channel === data.groups[i].channels[y]){
                data.groups[i].channels.splice(y, 1);
                deleteChannelFromUser();
              }
            }
          }
        }

        function deleteChannelFromUser(){
          for(i = 0; i < data.users.length; i++){
            for(x = 0; x < data.users[i].groups.length; x++){
              if(group === data.users[i].groups[x].name){
                for(y = 0; y < data.users[i].groups[x].channels.length; y++){
                  if(channel === data.users[i].groups[x].channels[y]){
                    data.users[i].groups[x].channels.splice(y, 1);
                  }
                }
              }
            }
          }
        }
        var newdata = JSON.stringify(data);
        fs.writeFile("users.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
        res.send(data)
      })

      app.post("/api/deletegroup", function(req, res){
        var rawdata = fs.readFileSync("users.json", "utf8");
        var data = JSON.parse(rawdata);

        group = req.body.deleteGroupName;

        for(i = 0; i < data.groups.length; i++){
          if(group === data.groups[i].name){
            data.groups.splice(i, 1)
            deleteFromUser()
          }
        }

        function deleteFromUser(){
          for(i = 0; i < data.users.length; i++){
            for(x = 0; x < data.users[i].groups.length; x++){
              if(group === data.users[i].groups[x].name){
                data.users[i].groups.splice(x, 1);
              }
            }
          }
        }
        var newdata = JSON.stringify(data);
        fs.writeFile("users.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
        res.send(true)
      })

      app.post("/api/addusertochannel", function(req, res) {
        var rawdata = fs.readFileSync("users.json", "utf8");
        var data = JSON.parse(rawdata);

        usergroups = [];

        username = req.body.inviteUsername;
        group = req.body.inviteGroup;
        channel = req.body.inviteChannel;
        valid = false;

        for(i = 0; i < data.users.length; i++){
          if(username === data.users[i].username) {
            for(y = 0; y < data.users[i].groups.length; y++){
              if(group === data.users[i].groups[y].name){
                usergroups = data.users[i].groups[y].channels
                console.log("USER GROUPS:" + usergroups)
                addChannel();
                data.users[i].groups[y].channels = usergroups
                console.log(data.users[i].groups[0])
                saveFile();
              }
            }
          }
        }

        function addChannel(){
          console.log(usergroups)
          if(usergroups.indexOf(channel) === -1){
            console.log("Channel not found!")
            console.log(channel)
            usergroups.push(channel)
            console.log("NEW USERGROUPS:" + usergroups)
            valid = true;
          }
        }

        function saveFile(){
        var newdata = JSON.stringify(data);
        fs.writeFile("users.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
      }
        res.send(valid)
      })
      
}