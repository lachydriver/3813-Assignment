const express = require('express');
const fs = require('fs');
const path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');


var app = express();
app.use(cors());

const PORT = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post("api/login", function(req, res) {
    if(!req.body) {
        return res.sendStatus(400);
    }

    let data = fs.readFileSync('users.json');
    let users = JSON.parse(data);    
    
    var user = {};

    user.username = req.body.username;
    user.valid = false;

    for(let i=0;i<users.length;i++){
        if(req.body.username == users[i].username){
            user.valid = true;
            user.role = users[i].role;
        }
    }
    res.send(user)
})


app.use(express.static(path.join(__dirname, '../dist/Assignment')));

app.listen(3000, () => {console.log(`server started on port: ${PORT}`)});