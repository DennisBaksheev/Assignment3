var data_service = require('./data-service')
const express = require('express')
const programs = require('./data/programs.json')
const students = require('./data/students.json')
const HTTP_PORT = process.env.PORT || 8080;
const app = express()
app.use(express.static('public')); 
app.get('/', (req, res) => {
    res.sendFile('./views/home.html', { root: __dirname })
})

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname })
})

app.get('/students', async (req, res) => {
    // const allStudents = {...students.users}
    res.json(allStudents)
})

app.get("/intlstudents", async (req, res) => {
    // const allIntlstudents = { ...intlstudents.users.filter(user => user.isInternationalStudent === true) };
    res.json(allIntlstudents);
});

app.get("/programs", async (req, res) => {
    // const allPrograms = { ...programs.users };
    res.json(allPrograms);
});

app.use((req, res) => {
    res.status(404).send('Page Not Found')
})


app.listen(HTTP_PORT, onHttpStart);

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}