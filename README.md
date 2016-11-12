Simple File Explorer Client and Server
======================================

Introduction
------------
There are two components to this:  a JavaScript/Angular client and a Nodejs server. The JavaScript/Angular client was inspired by [kstep/nginx-autoindex-js](https://github.com/kstep/nginx-autoindex-js) project, but has been heavily hacked. The server responds to directory requests with a JSON encoded list of files and directories.

Content
-------
The client will display the root of the content directory as large, international-friendly icons. To do this, the top-level directories need to belong to the following group:
* food
* government
* maps
* medical
* music
* power
* video
* water
* wifi
* written

The contents of these directories can then be the usual mix of files and directories. After choosing one of the top-level icons, the client will hide the large icons and display the child files and directories. Certain files with certain extensions will be shown with icons that help denote the file's nature.

Server
------

#### Installing
1. [Download](https://nodejs.org/en/) and install Node.js and NPM on target system.
1. Install this package somewhere
1. Edit `config/default.config`. Set `contentBase` to the base, file system location of the content to be served. Config `contentRoute` is the URL path at which content is served. The client will also use `contentRoute` to request content files and directory listings. Choose a different `port` if you don't want the server to listen on port 80.

	```json
	{
		"Content":{
			"contentBase":"/var/connectbox/content",
			"contentRoute":"/content"
		},
		"Server":{
			"port":80
		},
		"Client":{
			"tail_slash":false
		}
	}
	```
1. Navigate to the `server` directory and get dependencies

	```shell
	$ npm install
	```
	This will install the dependencies listed in `package.json`

#### Running
1. All that is left is to run `file_server.js` with Node. Since the server is, by default, listening to port 80, root priviledges will be needed to execute the server.

	```shell
	$ sudo NODE_CONFIG_DIR="../config/" node file_server.js
	```
	The `NODE_CONFIG_DIR` env variable sets the directory with the configuration files. If you want to enable debug logging, set the DEBUG env variable

	```shell
	$ sudo DEBUG="connectbox" NODE_CONFIG_DIR="../config/" node file_server.js
	```
1. Request the client by navigating to the web root of the server. The client and all support files will download.

#### Screenshots
![Top-level icons](https://dl.dropboxusercontent.com/u/11739650/connect_box_1.png)
![Top-level icons](https://dl.dropboxusercontent.com/u/11739650/connect_box_2.png)
