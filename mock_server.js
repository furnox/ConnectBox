#!/usr/bin/env node
var http = require('http');
var server = http.createServer();
server.on('request',
	function(request, response) {
		console.log('Request from ' + request.connection.remoteAddress);
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.end("{[{'name':'water','mtime':'1234343433','type':'directory'},{'name':'medical','mtime':'1234343433','type':'directory'}]}");
	}
);
server.listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');