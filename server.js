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
const dataservice = require('./data-service')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080;
const app = express()
app.use(express.static('public')); 
app.get('/', (req, res) => {
    res.sendFile('./views/home.html', { root: __dirname })
})

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname })
})

app.get('/students', (_, res) => {
	dataservice.getAllStudents().then((data) => {
		res.json(data)
	}).catch((err) => {
		res.json({ message: err })
	})
})

app.get('/intlstudents', (_, res) => {
	dataservice.getInternationalStudents().then((data) => {
		res.json(data)
	}).catch((err) => {
		res.json({ message: err })
	})
})

app.get('/programs', (_, res) => {
	dataservice.getPrograms().then((data) => {
		res.json(data)
	}).catch((err) => {
		res.json({ message: err })
	})
})

app.use((req, res) => {
    res.status(404).send('Page Not Found')
})

dataservice.initialize().then(() => {
	app.listen(PORT, () => {
		console.log(`Express http server listening on ${PORT}`)
	})
})
	.catch((err) => {
		console.log(err)
	})