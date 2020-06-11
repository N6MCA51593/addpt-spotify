const EventEmitter = require('events').EventEmitter;

const emitterObj = {
  emitter: new EventEmitter(),
  connections: [],
  emitFunc: function (ev, data) {
    this.emitter.emit(ev, data);
  },
  addCon: function (res) {
    res.req.ts = Date.now();
    this.connections.push(res);
  },
  deleteCon: function (conID) {
    if (this.connections.some(resE => resE.req.conID === conID)) {
      this.connections.splice(
        this.connections.findIndex(resE => resE.req.conID === conID),
        1
      );
    }
  },
  cleanup: function () {
    if (
      this.connections.some(
        resE => Date.now() - resE.req.ts > 24 * 60 * 60 * 1000
      )
    ) {
      this.connections = this.connections.filter(
        resE => Date.now() - resE.req.ts < 24 * 60 * 60 * 1000
      );
    }
  }
};

emitterObj.listenFunc = emitterObj.emitter.on('update', toStream => {
  emitterObj.connections.map(resE => {
    if (toStream.some(streamE => streamE.user === resE.req.user.id)) {
      const data = toStream.find(streamE => streamE.user === resE.req.user.id);
      resE.write('event: message\n');
      resE.write(`data: ${JSON.stringify(data)}\n`);
      resE.write('\n\n');
    }
  });
});

module.exports = emitterObj;
