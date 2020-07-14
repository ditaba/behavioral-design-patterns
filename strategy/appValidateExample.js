const jobList = ['FE', 'BE'];

// Strategy
const strategies = {
  checkRole: (value) => {
    if (value === 'registered') {
      return true;
    }
    return false;
  },
  checkGrade: (value) => {
    if (value >= 1) {
      return true;
    }
    return false;
  },
  checkJob: (value) => {
    if (jobList.indexOf(value) > -1) {
      return true;
    }
    return false;
  },
  checkType: (value) => {
    if (value === 'active user') {
      return true;
    }
    return false;
  }
};

// Context
const Validator = function() {
  // Store strategies
  this.cache = [];

  // Add strategy to cache
  this.add = (value, method) => {
    this.cache.push(() => {
      return strategies[method](value);
    });
  };

  // Check all strategies
  this.check = () => {
    for (let i = 0; i < this.cache.length; i++) {
      const valiFn = this.cache[i];
      const data = valiFn();
      if (!data) {
        return false;
      }
    }
    return true;
  };
};

const compose1 = function() {
  const validator = new Validator();
  const data1 = {
    role: 'register',
    grade: 3,
    job: 'FE',
    type: 'active user'
  };
  validator.add(data1.role, 'checkRole');
  validator.add(data1.grade, 'checkGrade');
  validator.add(data1.Job, 'checkJob');
  validator.add(data1.Type, 'checkType');
  const result = validator.check();
  return result;
};

const compose2 = function() {
  const validator = new Validator();
  const data2 = {
    role: 'registered',
    job: 'FE'
  };
  validator.add(data2.role, 'checkRole');
  validator.add(data2.job, 'checkJob');
  const result = validator.check();
  return result;
};

// Excute
let c1 = compose1();
console.log('compose1: ', c1);

let c2 = compose2();
console.log('compose2: ', c2);
