var sys = require('sys');
var fs = require('fs');
var url = require('url');
var express = require('express');

var app = express.createServer();
app.use(express.bodyParser());
app.use('/static', express.static(__dirname+'/static'));
app.listen(4040);

var io = require('socket.io').listen(app);

app.get('/', function(req, res) {
	res.contentType('html');
	var rs = fs.createReadStream(__dirname + '/monitor.html');
	sys.pump(rs, res);
});

io.sockets.on('connection', function(socket) {
  connectDate = new Date();
  connectMessage = {
    "message": "Connected to message server.",
    "date": connectDate.getTime()
  };
  socket.emit('message', connectMessage);
});

app.post('/endpoint', function(req, res) {
	console.log("endpoint hit");
	reqdate = new Date();
	req.body.date = reqdate.getTime();
	io.sockets.emit('message', req.body);
	res.send(req.body.source);
});
