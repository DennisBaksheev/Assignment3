const dataService = require("./data-service.js");
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static("public"));
const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"./views/home.html"));
})
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname,"./views/about.html"));
})

app.get('/students', (req, res) => {
  dataService.getAllStudents()
      .then(data => res.json(data))
      .catch(err => console.log(err))

})
app.get('/intlstudents', (req, res) => {
  dataService.getIntlstudents()
      .then(data => res.json(data))
      .catch(err => console.log(err))
})
app.get('/programs', (req, res) => {
  dataService.getPrograms()
      .then(data => res.json(data))
      .catch(err => console.log(err))
})
app.get('*', function (req, res) {
  res.sendFile('./views/404.html', { root: __dirname })
})

app.listen(port, () => {
  console.log(`Express http server listening on ${port}`)});