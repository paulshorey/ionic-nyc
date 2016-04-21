var pro = process;
pro.inc = {};
pro.inc.express = require('express');
pro.inc.express_parser = require('body-parser');
// modules
pro.moment = require('moment'); // pro.moment(new Date(2011, 9, 16)).
pro.moment.now = pro.moment();
pro.request = require('request');
pro.fs = require('fs');
pro.q = require('q');
pro._ = require('underscore');
pro.contentful = require('contentful');
pro.ejs = require("ejs");
pro.o3o = require('o3o');
pro.o3o.tags = pro.o3o();
pro.os = require("os");
// env
pro.env.PORT = 3080;
pro.env.PATH = __dirname;

// app
pro.app = pro.inc.express();
pro.app.use(pro.inc.express_parser.json({
	limit: '50mb'
}));
pro.app.use(pro.inc.express_parser.urlencoded({
	limit: '50mb',
	extended: true
}));
// custom
pro.fun = require("./node_custom/fun.js");
pro.console = require("./node_custom/console.js").console; // uses pro.app
pro.response = require("./node_custom/response.js");
// secret
//pro.secret = require('../secret-nyc/all.js');

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// VIEW
pro.window = {};
pro.window.system = {};
pro.window.system.platform = pro.os.platform();

	pro.window.system.api = {};
	pro.window.system.api.host = 'http://allevents.nyc';
	if (pro.window.system.platform=='darwin') {
		pro.window.system.api.host = 'http://localhost:1080';
	}

pro.window.page = {};
pro.window.page.title = pro.o3o(pro.o3o.tags[Math.floor(Math.random() * pro.o3o.tags.length)]);

//////////////////////////////////////////////////////////////////////////////////////////////////
// ASSETS
pro.app.use(pro.inc.express.static(__dirname+'/www'));

//////////////////////////////////////////////////////////////////////////////////////////////////
// INDEX

process.app.get(/^[a-z\/]*$/gi, function(request, response){
	response.setHeader('Content-Type', 'text/html'); 
	response.writeHead(200);
	response.write(process.ejs.render(pro.fs.readFileSync('./www/index.html', 'utf-8')));
	response.end();
});

process.app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// RELOAD
// process.fs.watch('public', function (event, filename) {
// 	process.console.warn('file changed:', filename);
// 	process.exit();
// });
// var watch = require('watch')
// watch.createMonitor('/home/mikeal', function (monitor) {
//   monitor.files['/home/mikeal/.zshrc'] // Stat object for my zshrc.
//   monitor.on("created", function (f, stat) {
//     // exec reload command here
//   })
//   monitor.on("changed", function (f, curr, prev) {
//     // exec reload command here
//   })
//   monitor.on("removed", function (f, stat) {
//     // exec reload command here
//   })
// })

////////////////////////////////////////////////////////////////////////////////////////////////////
process.app.listen(pro.env.PORT, function() {
	process.console.log("Node app is running at localhost: " + pro.env.PORT);
});
