/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: _Dennis Baksheev_____________________ Student ID: _114797186_____________ Date: _2022-09-28_______________
*
*  Online (Cyclic) Link: https://plum-important-wildebeest.cyclic.app/
*
********************************************************************************/ 
const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer');
const dataService = require('./data-service.js')
const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({extended:true}));
const upload = multer({storage: storage});

const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      }
});



app.post("/images/add", upload.single("imageFile"), (req,res) => {
    res.redirect("/images");
});

app.post('/students/add', (req,res) => {
    dataservice.addStudent(req.body).then(() => {
        res.redirect("/students");
    })
});
app.get("/images", (req,res) => {
    fs.readdir("./public/images/uploaded", function(err,items) {
        res.json(items);
    })
});

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded(req.body({ extended: true })));

app.get('/students/add', (_, res) => {
	res.sendFile(__dirname + '/views/addStudent.html')
})

app.get(/images/add, (_, res) => {
	res.sendFile(__dirname + '/views/addImage.html')
})



app.get('/', (_, res) => {
	res.sendFile(__dirname + '/views/home.html')
})

app.get('/about', (_, res) => {
	res.sendFile(__dirname + '/views/about.html')
})

app.get('/students', (_, res) => {
	dataService.getAllStudents().then((data) => {
		res.json(data)
	}).catch((err) => {
		res.json({ message: err })
	})
})

app.get('/intlstudents', (_, res) => {
	dataService.getInternationalStudents().then((data) => {
		res.json(data)
	}).catch((err) => {
		res.json({ message: err })
	})
})

app.get('/programs', (_, res) => {
	dataService.getPrograms().then((data) => {
		res.json(data)
	}).catch((err) => {
		res.json({ message: err })
	})
})

app.get('*', (_, res) => {
	res.status(404).send('Page Not Found')
})

dataService.initialize().then(() => {
	app.listen(PORT, () => {
		console.log(`Express http server listening on ${PORT}`)
	})
})
	.catch((err) => {
		console.log(err)
	})