const EventEmitter = require('events').EventEmitter;

const emitterObj = {
  emitter: new EventEmitter(),
  connections: [],
  emitFunc: function (ev, data) {
    this.emitter.emit(ev, data);
  },
  addCon: function (res) {
    if (this.connections.some(resE => resE.req.user.id === res.req.user.id)) {
      this.connections.splice(
        this.connections.findIndex(
          resE => resE.req.user.id === res.req.user.id
        ),
        1,
        res
      );
    } else {
      this.connections.push(res);
    }
    const conTimeout = 12 * 60 * 60 * 1000;
    setTimeout(() => {
      if (this.connections.some(resE => resE.req.user.id === res.req.user.id)) {
        this.connections.splice(
          this.connections.findIndex(
            resE => resE.req.user.id === res.req.user.id
          ),
          1
        );
      }
    }, conTimeout);
  },
  deleteCon: function (req) {
    if (this.connections.some(resE => resE.req.user.id === req.user.id)) {
      this.connections.splice(
        this.connections.findIndex(resE => resE.req.user.id === req.user.id),
        1
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
