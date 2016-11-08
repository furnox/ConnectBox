Simple File Explorer Client and Server
======================================

How To Use
----------

1. [Download](https://nodejs.org/en/) and install Node.js and NPM on target system.
1. Install this package somewhere
1. Edit `config/default.config`. Set `contentBase` to the base location of the content to be served. Value `contentRoute` should be left as `/content` as the client will expect it. Choose a different port if you don't want 80.
```json
{
	"Server":{
		"contentBase":"/var/connectbox/content",
		"contentRoute":"/content",
		"port":80		
	}
}
```
1. Navigate to the `server` directory and get dependencies
```shell
$ npm install
```
This will install the dependencies listed in `package.json`

All that is left is to run `file_server.js` with Node. Since the server is, by default, listening to port 80, root priviledges will be needed to execute the server.
```shell
$ sudo node file_server.js
```
If you want to enable debug logging, set the DEBUG env variable
```shell
$ sudo DEBUG="connectbox" node file_server.js 
```