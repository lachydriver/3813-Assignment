const express = require('express');
const fs = require('fs');
const path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');


var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const PORT = 3000;

app.use(express.static(path.join(__dirname, '../dist/Assignment')));

var useremail = "lachydriver@gmail.com"
var rawdata = fs.readFileSync('users.json');

var data = JSON.parse(rawdata)

app.post("/api/login", function(req, res) {

    user = {}

    user.email = req.body.inputEmail;
    user.valid = null;

    console.log(data.users[0].username)
    for(i=0; i<data.users.length;i++){
    if(user.email === data.users[i].username){
        user.valid = true;
    } else {
        user.valid = false;
    }
}
    res.send(user)
    console.log(user)

})



app.listen(3000, () => {console.log(`server started on port: ${PORT}`)});