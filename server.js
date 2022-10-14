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
const HTTP_PORT = process.env.PORT || 8080;
const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const dataservice = require(__dirname + "/data-service.js");

const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      }
});

const upload = multer({storage: storage});

app.use(bodyParser.urlencoded({extended:true}));

onHttpStart = () => {
    console.log('Express http server listening on port ' + HTTP_PORT);
}

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded(req.body({ extended: true })));

app.get('/', (_, res) => {
	res.sendFile(__dirname + '/views/home.html')
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get('/about', (_, res) => {
	res.sendFile(__dirname + '/views/about.html')
})

app.get("/students", (req, res) => {
    if (req.query.status) {
        dataservice.getStudentsByStatus(req.query.status).then((data) => {
            res.json({data});
        }).catch((err) => {
            res.json({message: err});
        })
    }
    else if (req.query.program) {
        dataservice.getStudentsByProgramCode(req.query.program).then((data) => {
            res.json({data});
        }).catch((err) => {
            res.json({message: err});
        })
    }
    else if (req.query.credential) {
        dataservice.getStudentsByExpectedCredential(req.query.credential).then((data) => {
            res.json({data});
        }).catch((err) => {
            res.json({message: err});
        })
    }
    else {
        dataservice.getAllStudents().then((data) => {
            res.json({data});
        }).catch((err) => {
            res.json({message: err});
        })
    }
});

app.get('/student/:value', (req,res) => {
    dataservice.getStudentByNum(req.params.value).then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get('/students/add', (_, res) => {
	res.sendFile(__dirname + '/views/addStudent.html')
})

app.post('/students/add', (req,res) => {
    dataservice.addStudent(req.body).then(() => {
        res.redirect("/students");
    })
});

app.get('/images/add',(req,res) => {
    res.sendFile(path.join(__dirname + "/views/addImage.html"));
});

app.post("/images/add", upload.single("imageFile"), (req,res) => {
    res.redirect("/images");
});

app.get("/images", (req,res) => {
    fs.readdir("./public/images/uploaded", function(err,items) {
        res.json(items);
    })
});

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

dataservice.initialize().then(() => {
    app.listen(HTTP_PORT, onHttpStart())
}).catch (() => {
    console.log('promises unfulfilled');
});



