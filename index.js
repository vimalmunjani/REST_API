// Startup file for our API


// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// creating server
var server = http.createServer(function(req, res){


    // get the request method
    let httpMethod = req.method.toLocaleLowerCase();
    console.log(httpMethod);

    //get the headers as an Object
    var headers = req.headers;
    console.log(headers);

    // get the auth token
    var authToken = headers['username'];
    console.log('authToken - ',authToken);

    // get the path(route)
    var parseduRL = url.parse(req.url, true);
    console.log(parseduRL.pathname);

    // get the query string Object
    var queryString = parseduRL.query;
    console.log(queryString);

    // get the request body
    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on('data',function(data) {
        buffer += decoder.write(data);
    })

    req.on('end',function(){
        buffer += decoder.end();

        console.log('buffer',buffer);

    });


    res.end('Heloo world')

});

// start the server, have it listen on port 3000
server.listen(5000, function(){
    console.log('Listening at port 5000');
});