const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public'));


