const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const { json } = require('express');

var app = express();

var PORT = process.env.PORT || 3000;

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
                maxId = note.id;
            }
        }

        postNote.id = maxId + 1;

        db.push(postNote);

        fs.writeFile(jsonFile, JSON.stringify(db), function(err) {
            if (err) {
                return err;
            } 
            console.log("Note saved!");
        });

        res.json(postNote);
    });

app.delete('/api/notes/:id', function(req, res) {
    let jsonFile = path.join(__dirname, '/db/db.json');
    for(let i = 0; i < db.length; i++) {
        if(db[i].id == req.params.id) {
            db.splice(i, 1)
            break
        }
    }

    fs.writeFileSync(jsonFile, JSON.stringify(db), function(err) {
        if(err) {
            return err;
        } else {
            console.log('Note deleted!')
        }
    });
    res.json(db);
})

app.listen(PORT, function() {
    console.log("running on localhost:" + PORT)
})