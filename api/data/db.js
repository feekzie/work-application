var mongoose = require('mongoose');
var dburl = "mongodb://localhost:27017/work";

mongoose.connect(dburl);
mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected');
});
mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error ' + err);
});

process.on('SIGNIT', function(){
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});

});

process.on('SIGTERM', function(){
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});

});

process.once('SIGUSR2', function(){
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app termination');
		process.kill(process.pid, 'SIGUSR2');
	});

});
// BRING IN SCHEMAS AND MODELS
require('./works.model.js');
require('./users.model.js');