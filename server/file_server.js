#!/usr/bin/env node

var connect = require('connect');
var serveStatic = require('serve-static')
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var debug = require('debug')('connectbox');
var config = require('config');

var contentBase = config.get('Server.contentBase');
var contentRoute = config.get('Server.contentRoute');
var port = config.get('Server.port');

var app = connect();

// Serve files at document root, namely, the client files
app.use('/',serveStatic('../client', {'index': ['index.html']}));

// Serve requests for directory listing
app.use(contentRoute,
	function(request, response, next) {
		debug('Request from: ' + request.connection.remoteAddress);
		var pathname = contentBase + url.parse(request.url).pathname;
		debug('Request for: ' + pathname);
		if (!fs.existsSync(pathname) || !fs.statSync(pathname).isDirectory()) {
			debug('Not a directory');
			next(); // Bail if it isn't a directory ...maybe it's a static file? Call the next middleware.
			return;
		}
		fs.readdir(pathname,
			function(err, files) {
				if (err) {
					throw err;
				}
				var result=[];
				files.filter(
					// Filter out anything not a file or a directory
					function(file) {
						var stat = fs.statSync(pathname + '/' + file);
						return stat.isFile() || stat.isDirectory();
					}
				).forEach(
					// Build JavaScript object with file/directory information
					function(file) {
						var fileInfo = {};
						var stat = fs.statSync(pathname + '/' + file);
						fileInfo.size = stat['size'];
						if (stat.isFile()) {
							fileInfo.type = 'file';
						} else {
							fileInfo.type = 'directory';
						}
						fileInfo.name = file;
						result.push(fileInfo);
					}
				);
				debug('Directory listing',JSON.stringify(result));
				response.setHeader('Content-Type', 'application/json');
				response.end(JSON.stringify(result));
			}
		);
	}
);

// Serve static files
app.use(contentRoute,serveStatic(contentBase, {'dotfiles':'ignore'}));

http.createServer(app).listen(port);
