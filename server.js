var express = require("express");
var app = express();

var path = require("path");
var data_service = require("./data-service.js")
var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost:8080)
app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", (req,res) =>{
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// Adding additional routes
app.get("/employees", (req,res) =>{
    data_service.getAllEmployees().then((data)=>{
        res.json(data);
    }).catch((err)=>{
        console.log(err);
        res.json({ message: err });
    });
});


app.get("/students", (req,res)=>{
    data_service.getStudents().then((data)=>{
        res.json(data);
    }).catch((err)=>{
        console.log(err);
        res.json({ message: err });
    });
});

app.get("/departments", (req,res)=>{
    data_service.getDepartments().then((data)=>{
        res.json(data);
    }).catch((err)=>{
        console.log(err);
        res.json({ message: err });
    });
});

app.use((req, res) => {
    res.status(404).send("Error 404: Page Not Found.");
});

data_service.initialize().then(() => {
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) => {
    console.log("Error: " + err);
});