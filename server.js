const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})