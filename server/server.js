const express = require("express");
const path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 3000;

require('./routes/api.js')(app);

app.use(express.static(path.join(__dirname, "../dist/Assignment")));

app.listen(3000, () => {
  console.log(`server started on port: ${PORT}`);
});
