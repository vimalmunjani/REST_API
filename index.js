// Startup file for our API


// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

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


        // router handler
        var routeHandler = typeof (router[trimmedPath]) === 'undefined' ? router['notFound'] : router[trimmedPath];

        var data = {
            'method': httpMethod,
            'path': trimmedPath,
            'queryString': queryString,
            'headers': headers,
            'payload': buffer
        }

        routeHandler(data, function (statusCode, payload) {
            // use the status code defined by the hanler or default to 200
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            // if there is no payload coming from handler, default to empty object
            payload = typeof (payload) == 'object' ? payload : {};

            // convert the payload to a string
            payload = JSON.stringify(payload);

            // return the response
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payload);

            console.log(`Response - ${statusCode} - ${payload}`);
        });
    });
});

// start the server, have it listen on port 3000
server.listen(config.port, function () {
    console.log('Listening at port - ', config.port);
});

var handlers = {};

handlers.test = function (data, callback) {

    callback(200, {
        'firstName': 'vimal',
        'lastName': 'munjani'
    });
}

handlers.notFound = function (data, callback) {

    callback(404, {});

}

var router = {
    'test': handlers.sample,
    'notFound': handlers.notFound
}