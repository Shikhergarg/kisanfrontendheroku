var express     = require('express'),
    feapp       = express(),
    path        = require('path'),
    bodyParser  = require('body-parser'),
    fs          = require('fs'),
    compression = require('compression');


//Setup
feapp.use(compression({ threshold: 0 }));
feapp.use(express.static(path.join(__dirname, '..' ,'/public') , { maxAge: 3600 } )); //Use Cache-Control for performance
feapp.use(bodyParser.json());////For parsing application/json
feapp.use(bodyParser.urlencoded({extended: true}));
feapp.use(express.static(__dirname));


//HTTP server
http    = require('http'); //Or https - but you will have add SSL certificats
var FE_HTTP_PORT = 8000;

var feServer = http.createServer(feapp);
feServer.listen(process.env.PORT || 8000, function() {
    console.log('Listening on port ', FE_HTTP_PORT);
});


// Simple Routing
feapp.get('*', function(req, res){
     res.sendFile(path.join(__dirname, '..' ,'/public', 'index_site.html'));
});


module.exports = feapp;