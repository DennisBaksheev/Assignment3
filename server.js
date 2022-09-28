const data_service = require('./data-sevice');
const express = require('express');
const path = require('path');
const programs = require('./data/programs.json');
const students = require('./data/students.json');
const app = express();
app.use(express.static("public"));
const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"./views/home.html"));
})
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname,"./views/about.html"));
})

app.get('/students', async (req, res) => {
  const allStudents = {...student.users}
  res.json(allStudents)
})

app.get("/intlstudents", async (req, res) => {
  const allStudents = { ...students.users.filter(user => user.isInternationalStudent === true) };
  res.json(allStudents);
});

app.get("/programs", async (req, res) => {
  const allPrograms = { ...programs.users };
  res.json(allPrograms);
});

app.use((req, res) => {
  res.status(404).send('Page Not Found')
})


app.listen(port, () => {
  console.log(`Express http server listening on ${port}`)});