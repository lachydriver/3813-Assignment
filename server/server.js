const express = require("express");
const path = require("path");
const MongoClient = require('mongodb').MongoClient;
var cors = require("cors");
var bodyParser = require("body-parser");
var ObjectID = require('mongodb').ObjectID;

var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err,client) {
  if(err) {return console.log(err)}
    const dbName = 'chat';
    const db = client.db(dbName);
    console.log("connected successfully to server");
    require('./routes/database.js')(db,app,ObjectID);
    client.close();
    
});

const sockets = require('./socket.js');
sockets.connect(io, 3000);

app.use(express.static(path.join(__dirname, "../dist/Assignment")));

server.listen(3000, () => {
  console.log(`server started on port: 3000`);
});