const express = require("express");
const fs = require("fs");
const path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 3000;

app.use(express.static(path.join(__dirname, "../dist/Assignment")));

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

  user.username = req.body.newUsername;
  user.role = req.body.role;
  user.groups = "";

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

app.listen(3000, () => {
  console.log(`server started on port: ${PORT}`);
});
