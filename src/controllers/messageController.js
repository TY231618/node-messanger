let Message = require('../models/message');

module.exports = (app) => {
  let http = require('http').Server(app);
  let io = require('socket.io')(http);

  app.get('/messages', (req, res) => {
    
    Message.find({}, (err, messages) => {
      if(err) sendStatus(500);
  
      res.send(messages);
    });
  });
    
  app.get('/messages/:user', (req, res) => {
    
    let user = req.params.user;
  
    Message.find({name: user}, (err, messages) => {
      if(err) sendStatus(500);
  
      res.send(messages);
    });
  });
    
    //original post request
  app.post('/messages', (req, res) => {
    let message = new Message(req.body);
  
    message.save((err) => {
      if(err) sendStatus(500);
  
      io.emit('message', req.body);
      res.sendStatus(200);
    });
  });
    
    //callback hell post request and remove happens after the save!!!
    // app.post('/messages', (req, res) => {
    //   let message = new Message(req.body);
    
    //   message.save((err) => {
    //     if(err) sendStatus(500);
    
    //     Message.findOne({message: 'badword'}, (err, censored) => {
    //       if(censored) {
    //         console.log('censored word found: ', censored);
    //         Message.remove({_id: censored.id}, (err) => {
    //           console.log('removed censored message');
    //         });
    //       }
    //     });
    
    //     io.emit('message', req.body);
    //     res.sendStatus(200);
    //   });
    // });
    
    //using promises
    // app.post('/messages', (req, res) => {
    //   let message = new Message(req.body);
    
    //   message.save()
    //     .then(() => {
    //       console.log('saved');
    //       return Message.findOne({message: 'badword'});
    //     })
    //     .then((censored) => {
    //       if(censored) {
    //         console.log('censored word found: ', censored);
    //         return Message.remove({_id: censored.id});
    //       }
    
    //       io.emit('message', req.body);
    //       res.sendStatus(200);
    //     })
    //     .catch((err) => {
    //       res.sendStatus(500);
    //       return console.error(err);
    //     });
    // });
    
  //now using async
  // app.post('/messages', async (req, res) => {
  //   try {
  //     let message = new Message(req.body);
      
  //       let savedMessage = await message.save();
      
  //       console.log('saved');
      
  //       let censored = await Message.findOne({message: 'badword'});
      
  //       if(censored) {
  //         await Message.remove({_id: censored.id});
  //       } else {
  //         io.emit('message', req.body);
  //       }
      
  //       res.sendStatus(200);
  //   } catch (err) {
  //     res.sendStatus(500);
  //     return console.error(err);
  //   }
  // });
};