// Startup file for our API


// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// creating server
var server = http.createServer(function (req, res) {


    // get the request method
    let httpMethod = req.method.toLocaleLowerCase();
    console.log('httpMethod - ', httpMethod);

    //get the headers as an Object
    var headers = req.headers;
    console.log('headers - ', headers);

    // get the auth token
    var authToken = headers['x-access-token'];
    console.log('authToken - ', authToken);

    // get the path(route)
    // true is to tell to parse the query string also
    // url -> localhost:3000/foo/bar, pathname -> /foo/bar
    var parseduRL = url.parse(req.url, true);

    var path = parseduRL.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    console.log('request received on path - ', trimmedPath);

    // get the query string Object
    var queryString = parseduRL.query;
    console.log('queryString - ', queryString);

    // get the request body
    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on('data', function (data) {
        buffer += decoder.write(data);
    })

    req.on('end', function () {
        buffer += decoder.end();

        console.log('Request Body received in request(buffer) - ', buffer);

        res.end(`Request was received with payload - ${buffer}`);
    });

    

});

// start the server, have it listen on port 3000
server.listen(5000, function () {
    console.log('Listening at port 5000');
});