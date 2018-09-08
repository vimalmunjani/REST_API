// Startup file for our API


// Dependencies
const http = require('http');
const url = require('url');


// creating server
var server = http.createServer(function(req, res){
    
    console.log(req.body);
    var path = url.parse(req.url, true);
    console.log(path.pathname);

});


// start the server, have it listen on port 3000
server.listen(3000, function(){
    console.log('Listening at port 3000');
});