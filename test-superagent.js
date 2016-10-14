const request = require('superagent')

request
    .get('http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC')
    .end(function (err, resp) {
        if (err) console.trace(err)
        console.log(resp)
    })