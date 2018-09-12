const express = require('express');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;

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
})

app.get('/', (req,res) => {
    res.send('Hello!');
});

app.listen(port, () => {
    console.log('Server is live on:', port);
});