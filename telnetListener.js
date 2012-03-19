/*************************************************************
Copyright © 2012 Toby Allen (http://github.com/tobya)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, sub-license, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice, and every other copyright notice found in this software, and all the attributions in every file, and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
****************************************************************/

//Libraries
var net = require('net');
var request = require('request');
var config = require('./config');
var qs = require('querystring');


console.log(config);

var client = net.createConnection(config.serverPort,config.serverIP, function() { 
  console.log('client connected');
});


//When Data is recieved.
client.on('data', function(data) {
  var line = data.toString();
  var encoded =   encodeURIComponent(line);	
  console.log(line);
  console.log(encoded);
  

  getPage(config.onDataURL + '?data=' + encoded);
});

//Disconnection.
client.on('end', function() {
  console.log('client disconnected');
  getPage(config.onDisconnectURL);  
});


function getPage (someUri) {
  request({uri: someUri}, function (error, response, body) {
      console.log("Fetched " +someUri+ " OK!");

    });
}