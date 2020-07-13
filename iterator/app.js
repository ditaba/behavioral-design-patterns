const Iterator = function (items) {
  this.index = 0;
  this.items = items;
};

Iterator.prototype = {
  first: function () {
    this.reset();
    return this.next();
  },
  next: function () {
    return this.items[this.index++];
  },
  hasNext: function () {
    return this.index <= this.items.length;
  },
  reset: function () {
    this.index = 0;
  },
  each: function (callback) {
    for (let item = this.first(); this.hasNext(); item = this.next()) {
      callback(item);
    }
  },
};

// Log helper
const Log = function () {
  let log = '';
  return {
    add: (msg) => {
      log += msg + '\n';
    },
    show: () => {
      console.log(log);
    },
    reset: () => {
      log = '';
    },
  };
};

function run() {
  const items = ['one', 2, 'circle', true, 'Applepie'];
  const iter = new Iterator(items);
  const log = new Log();

  // Using for loop
  for (let item = iter.first(); iter.hasNext(); item = iter.next()) {
    log.add(item);
  }
  log.add('');

  // Using Iterator's each method
  iter.each((item) => {
    log.add(item);
  });

  log.show();
}

run();
