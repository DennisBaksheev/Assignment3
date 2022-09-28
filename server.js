const data_service = require('./data-sevice');
const express = require('express');
const path = require('path');
const programs = require('./data/programs.json');
const students = require('./data/students.json');
const app = express();
app.use(express.static("public"));
const port = process.env.PORT || 8080;
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname,"./views/home.html"));
})
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname,"./views/about.html"));
})




app.listen(port, () => {
  console.log(`Express http server listening on ${port}`)});