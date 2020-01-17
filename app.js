const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');

//init nexmo
const apiKey = '';
const apiSecret = '';

const nexmo = new Nexmo({apiKey, apiSecret}, {debug: true});

// init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Post route
app.post('/', (req, res) => {
    const from = req.body.from || 'Kostia';
    const to = req.body.number;
    const text = req.body.text;

    nexmo.message.sendSms(from, to, text);

    res.status(201);
    res.send(req.body);
    console.log(req.body);
});


//Start server
const port = 3000;
const server = app.listen(port, () => console.log('Server started on port', port));
