const express = require('express')
const path = require('path')
const data_service = require('./data-service.js')
const app = express()
var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (_, res) => {
	res.sendFile(__dirname + '/views/home.html')
})

app.get('/about', (_, res) => {
	res.sendFile(__dirname + '/views/about.html')
})

app.get('*', (_, res) => {
	res.status(404).send('Page Not Found')
})

app.listen(HTTP_PORT);
