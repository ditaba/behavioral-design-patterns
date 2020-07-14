const Shipping = function() {
  this.company = '';
};

Shipping.prototype = {
  setStrategy: function(company) {
    this.company = company;
  },
  calculate: function(_package) {
    return this.company.calculate(_package);
  }
};

const UPS = function() {
  this.calculate = function(_package) {
    // calculations...
    return '$45.95';
  };
};

const USPS = function() {
  this.calculate = function(_package) {
    // calculations...
    return '$39.40';
  };
};

const Fedex = function() {
  this.calculate = function(_package) {
    // calculating...
    return '$43.20';
  };
};

const Log = function() {
  let log = '';
  return {
    add: function(msg) {
      log += msg + '\n';
    },
    show: function() {
      console.log(log);
    },
    reset: function() {
      log = '';
    }
  };
};
const log = Log();

// const Log = function() {
//   this.log = '';
//   this.add = function(msg) {
//     this.log += msg + '\n';
//   };
//   this.show = function() {
//     console.log(this.log);
//   };
//   this.reset = function() {
//     this.log = '';
//   };
// };
// const log = new Log();

function run() {
  const _package = { from: '76712', to: '10012', weigth: 'lkg' };
  // the 3 strategies
  var ups = new UPS();
  var usps = new USPS();
  var fedex = new Fedex();
  var shipping = new Shipping();
  shipping.setStrategy(ups);
  log.add('UPS Strategy: ' + shipping.calculate(_package));
  shipping.setStrategy(usps);
  log.add('USPS Strategy: ' + shipping.calculate(_package));
  shipping.setStrategy(fedex);
  log.add('Fedex Strategy: ' + shipping.calculate(_package));
  log.show();
}

run();
