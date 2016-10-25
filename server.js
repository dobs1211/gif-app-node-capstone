var unirest = require('unirest');
var request = require('superagent');
var express = require('express');
var events = require('events');
var app = express();
app.use(express.static('public'));

//first API call to get the giph from search
var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
        unirest.get('https://crossorigin.me/http://api.giphy.com/v1/gifs/search?q=' + args + '&api_key=dc6zaTOxFJmzC')
            .end(function(response) {
            if (response.ok) {
                console.log(response.JSON);
                emitter.emit('end', response.body);
            }
            else {
                emitter.emit('error', response.code);
                console.log(response.body.data[0].embed_url);
            }
        });
        
    return emitter;
};
//var app = express();
app.use(express.static('public'));
app.get('/search/:name', function(req, res) {
    var searchReq = getFromApi(req.params.name);
    searchReq.on('end', function(item) {
        var searchResults = item.data;
        console.log(item.data[0].embed_url);
        res.json(item.data);
    });
    
    searchReq.on('error', function(code) {
        res.sendStatus(code);
    });
});

app.listen(process.env.PORT || 8080);


