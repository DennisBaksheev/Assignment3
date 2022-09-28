var dataservice = require('./data-sevice');
var express = require('express');
var path = require('path');
var programs = require('./data/programs.json');
var students = require('./data/students.json');
var app = express();
app.use(express.static("public"));
var HTTP_PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"./views/home.html"));
})
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname,"./views/about.html"));
})

app.use((req, res) => {
  res.status(404).send("404 Error - Page Not Found");
});



app.listen(port, () => {
  console.log(`Express http server listening on ${port}`)});