var sum = require('./sum.js');
var number = require('./number.js');


module.exports = function(arr){
    return sum(arr)/number(arr);
};