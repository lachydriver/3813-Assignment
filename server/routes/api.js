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

      app.post("api/addchannel", function(req, res) {
        
      })

      app.get("/api/getgroups", function(req, res) {
        var rawdata = fs.readFileSync("users.json", "utf8");
        var thisdata = JSON.parse(rawdata);

        data = thisdata.groups;
        console.log(data)
        res.send(data);
      });
}