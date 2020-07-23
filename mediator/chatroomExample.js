const Participant = function(name) {
  this.name = name;
  this.chatroom = null;
  this.send = (message, to) => {
    this.chatroom.send(message, this, to);
  };
  this.receive = (message, from) => {
    log.add(from.name + ' to ' + this.name + ': ' + message);
  };
};

const Chatroom = function() {
  this.participants = {};
  this.register = (participant) => {
    this.participants[participant.name] = participant;
    participant.chatroom = this;
  };
  this.send = (message, from, to) => {
    if (to) {
      to.receive(message, from);
    } else {
      for (const key in this.participants) {
        if (this.participants[key] !== from) {
          this.participants[key].receive(message, from);
        }
      }
    }
  };
};

const log = (function() {
  let log = '';
  return {
    add: (msg) => {
      log += msg + '\n';
    },
    show: () => {
      console.log(log);
      log = '';
    }
  };
})();

function run() {
  const yoko = new Participant('Yoko');
  const john = new Participant('John');
  const paul = new Participant('Paul');
  const ringo = new Participant('Ringo');

  const chatroom = new Chatroom();
  chatroom.register(yoko);
  chatroom.register(john);
  chatroom.register(paul);
  chatroom.register(ringo);

  yoko.send('All you need is love.');
  yoko.send('I love you John.');
  john.send('Hey, no need to broadcast', yoko);
  paul.send('Ha, I heard that!');
  ringo.send('Paul, what do you think?', paul);

  log.show();
}

run();
