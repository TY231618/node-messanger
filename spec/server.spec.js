let request = require('request');

describe('get messages', () => {
  it('should respond with a 200 ok status', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  it('should return 2 messages', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      expect(JSON.parse(res.body).length).toBe(2);
      done();
    });
  });
});

describe('get messages from specific user', () => {

  it('should respond with a 200 ok status', (done) => {
    request.get('http://localhost:3000/messages/john', (err, res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  it('should return messages of user named John', (done) => {
    request.get('http://localhost:3000/messages/john', (err, res) => {
      expect(JSON.parse(res.body)[0].name).toEqual('john'); 
      done();     
    });
  });
});