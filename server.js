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

app.route('/api/notes')
    .get(function(req, res) {
        res.json(db)
    })

    .post(function(req, res) {
        let jsonFile = path.join(__dirname, '/db/db.json');
        let postNote = req.body;

        let maxId = 99;

        for(let i = 0; i< db.length; i++) {
            let note = db[i];

            if(note.id > maxId) {

            }
        }

        note.id = maxId + 1;

        db.push(postNote);

        fs.writeFile(jsonFile, JSON.stringify(db), function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("Note saved!");
        })

        res.json(postNote);
    })