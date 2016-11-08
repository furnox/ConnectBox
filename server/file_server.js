#!/usr/bin/env node

var connect = require('connect');
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')
var http = require('http');

var app = connect();

// respond to root requests
//app.use('/',
	//function(request, response, next) {
		//console.log('Request from ' + request.connection.remoteAddress);
		//response.end('Hello from Connect!\n');
	//}
//);

//app.use(serveStatic('../content', {'index': ['index.html', 'index.htm']}));
app.use('/content', serveIndex('../content', {'icons': true}));

http.createServer(app).listen(80);