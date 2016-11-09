#!/usr/bin/env node

var connect = require('connect');
var serveStatic = require('serve-static')
var http = require('http');
var debug = require('debug')('connectbox');

var app = connect();

app.use(serveStatic('../client', {'index': ['index.html']}));
app.use('/content',
	function(request, response, next) {
		debug('Request from: ' + request.connection.remoteAddress);
		response.end("[{'name':'tester'}]");
	}
);
app.use(serveStatic('../content', {'dotfiles':'ignore'}));

http.createServer(app).listen(80);