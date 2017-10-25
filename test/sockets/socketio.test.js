const socketio = require('feathers-socketio');
const io = require('socket.io-client');
const baseTests = require('feathers-commons/lib/test/client');
const app = require('../fixture');
const feathers = require('../../lib/client');

describe('Socket.io connector', function () {
  const socket = io('http://localhost:9988');
  const client = feathers()
    .configure(feathers.socketio(socket));

  before(function (done) {
    this.server = app(function () {
      this.configure(socketio());
    }).listen(9988, done);
  });

  after(function (done) {
    socket.once('disconnect', () => {
      this.server.close();
      done();
    });
    socket.disconnect();
  });

  baseTests(client, 'todos');
});
