let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
let http = require('http').Server(app);
let io = require('socket.io')(http);
let messageController = require('./src/controllers/messageController');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise = Promise;

let dbURL = 'mongodb://test:test@ds113925.mlab.com:13925/node-messanger';

messageController(app);

mongoose.connect(dbURL, (err) => {
  console.log('mongoose connection err: ', err);
});

io.on('connection', (socket) => {
  console.log('a user is connected');
});

let server = http.listen(3000, () => {
  console.log('server is listening on port ', server.address().port);
});