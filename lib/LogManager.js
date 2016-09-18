/**
* LogManager is a convenience wrapper for application-wide usage without
* getting into too much details about log4js-node and logfaces appenders.
* LogManager is singleton - should be instantiated at  application startup
* and then used from wherever needed. The usage described in the methods below.
*/

'use strict';
var log4js = require('log4js');
var lfs = require('./LogFacesAppender');
var instance = null;

class LogManager{
	constructor() {
		if(instance)
			return instance;
		instance = this;
		return instance;
	}

	/**
	* Instantiates a logger by category name
	*/
	getLogger(name){
		return log4js.getLogger(name);
	}

	/**
	* Remote logging can be UDP based (for node apps) or XHR based (for browser-based apps)
	*
	* Configuration for browser-based apps must provide the following:
	* 1. 'url' for remote logging - see logfaces receiver mapping on the server side
	* 2. 'application' name - will appear like domain or application in logfaces
	* example: {url: http://host:8050/receivers/myapp, application: "myapp.name"}
	*
	* Configuration for node based apps with UDP must provide the following:
	* 1. 'remoteHost' - the logfaces server host or IP
	* 2. 'port' - the logfaces receiver listening port
	* 3. 'application' - will appear like domain or application in logfaces
	*/
	setupRemote(config){
		log4js.addAppender(lfs.appender(config));
	}

	/**
	* Sets global logging threshold, this will block all logs with lesser
	* levels than specified here. For example setting this threshold to INFO
	* will block all logs with TRACE ab DEBUG levels
	*/
	setThreshold(string){
		log4js.setGlobalLogLevel(string);
	}

	/**
	* Adds context variables which will be relayed with all logs to remote server.
	* For example setting (sessionID, xxx) will append this key-value pair
	* to all logs sent to remote server.
	*/
	setContext(key, value){
	   lfs.setContext(key, value);
	}

}

function getLogger(name){
	return new LogManager().getLogger(name);
}

function setThreshold(string){
	return new LogManager().setThreshold(string);
}

function setContext(key, value){
	return new LogManager().setContext(key, value);
}

function setupRemote(config){
	return new LogManager().setupRemote(config);
}

exports.LogManager = LogManager;
exports.getLogger = getLogger;
exports.setThreshold = setThreshold;
exports.setContext = setContext;
exports.setupRemote = setupRemote;
