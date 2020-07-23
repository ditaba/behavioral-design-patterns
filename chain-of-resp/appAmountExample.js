const Request = function(amount) {
  this.amount = amount;
  log.add('Request: $' + amount + '\n');
};

Request.prototype = {
  get: function(bill) {
    const count = Math.floor(this.amount / bill);
    this.amount -= count * bill;
    log.add('Dispense ' + count + ' $' + bill + ' bills');
    return this;
  }
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
  const request = new Request(378);
  request
    .get(100)
    .get(50)
    .get(20)
    .get(5)
    .get(1);
  log.show();
}

run();
