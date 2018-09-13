const express = require('express');
const app = express();
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}\n`;
    console.log(log);
    fs.appendFile('server.log', log, (err) => {
        if(err) {
            console.log("Couldn't update log file.");
        }
    });
    next();
});

app.use(express.static(__dirname + '/node_modules/materialize-css/dist/'));
app.use(express.static(__dirname + '/views/'));

app.get('/', (req,res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log('Server is live on:', port);
});