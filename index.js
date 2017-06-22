'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

const fb_page_token = process.env.FB_PAGE_ACCESS_TOKEN
app.set('port', (process.env.PORT || 80))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

//verification
app.get('/webhook/', function (req, res) {
	console.log('token: '+fb_page_token+', verifytoken:' + req.query['hub.verify_token']+', challenge: ' + req.query['hub.challenge']);
	if (req.query['hub.verify_token'] === fb_page_token) {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

//Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
