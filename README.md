# LogManager
Convenience module wrapping [log4js-node](https://github.com/nomiddlename/log4js-node) library and [logFaces](http://www.logfaces.com)
remote appenders for client and server side JS applications

## Who is it for
1. those who need proper logging mechanism integrated into js apps
2. those who use (want/can use) [log4js-node](https://github.com/nomiddlename/log4js-node) as logging framework
3. those who use (want/can use) [logFaces](http://www.logfaces.com) as a centralized remote log management

## What does it do
1. single code base, it will run in both node.js and most modern browsers
2. offers simple integration wrapper to quickly setup remote logging on application side
3. provides simple controlling functions like setting thresholds, context, remote url.

## How to use in browser based apps
```javascript
// this is what you would normally do in client js applications
// setup HTTP based remote logging with logFaces web receiver
var LogManager = require('./LogManager');
var log = LogManager.getLogger("app");

LogManager.setThreshold("INFO");
LogManager.setupRemote({
   application: "my-app-name",
   url: "http://myhost:8050/receivers/myapp"
});
log.warn("this comes from the browser based app");

// turn logging off
LogManager.setThreshold("OFF");
```

## How to use in node.js
```javascript
// setup UDP remote logging with logFaces UDP receiver
var LogManager = require('./LogManager');
var log = LogManager.getLogger("app");

LogManager.setThreshold("TRACE");
LogManager.setupRemote({
   application: "my-nodejs-app",
   remoteHost: "my-server-host",
   port: "55201"
});
log.info("this comes from node.js server app");

// set MDC context, this will result in all logs sent out to server
// with certain diagnistic context like 'user' and 'job'
LogManager.setContext("user", "foo");
LogManager.setContext("job", "bar");
log.info("this will arive to server with context variables");
```
