const HTTP_PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
const path = require('path');
const data = require('./data-service');

app.use(express.static('public')); 

// Route to the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html')); // Send the home page  
});

// Route to About page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

// Route to employee data
app.get("/students", (req, res) => {
  const getAllStudents = {...students.users}
    res.json(getAllStudents)
    })
    .catch((err) => {
      console.log("Error retrieving students: " + err);
      res.json({ message: err });
    });



// Route to manager data
app.get("/intlstudents", (req, res) => {
  data.getIntlstudents()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("Error retrieving intlstudents: " + err);
      res.json({ message: err });
    });
});

// Route to department data
app.get("/programs", (req, res) => {
  data.getPrograms()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("Error retrieving programs: " + err);
      res.json({ message: err });
    });
});

// Catch all other requests
app.use((req, res) => {
  res.status(404).send("Page Not Found");
})

data.initialize().then(() => {
  app.listen(HTTP_PORT);
  console.log("Express http server listening on " + HTTP_PORT);
}).catch((err) => {
  console.log("Error starting server: " + err + " aborting startup");
});