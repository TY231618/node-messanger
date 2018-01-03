let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
let http = require('http').Server(app);
let io = require('socket.io')(http);
let Message = require('./message');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let dbURL = 'mongodb://test:test@ds113925.mlab.com:13925/node-messanger';

app.get('/messages', (req, res) => {

  Message.find({}, (err, messages) => {
    if(err) sendStatus(500);

    res.send(messages);
  });
});

app.post('/messages', (req, res) => {
  let message = new Message(req.body);

  message.save((err) => {
    if(err) sendStatus(500);

    Message.findOne({message: 'badword'}, (err, censored) => {
      if(censored) {
        console.log('censored word found: ', censored);
        Message.remove({_id: censored.id}, (err) => {
          console.log('removed censored message');
        });
      }
    });

    io.emit('message', req.body);
    res.sendStatus(200);
  });
});

io.on('connection', (socket) => {
  console.log('a user is connected');
});

mongoose.connect(dbURL, (err) => {
  console.log('mongoose connection err: ', err);
});

let server = http.listen(3000, () => {
  console.log('server is listening on port ', server.address().port);
});