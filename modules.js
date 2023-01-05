const { people, callback } = require('./people');

const os = require('os');

callback();

console.log(people);
console.log(os.version());