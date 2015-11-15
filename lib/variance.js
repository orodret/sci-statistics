var mean = require('./mean.js');
var number = require('./number.js');
var sum = require('./sum.js');

module.exports = function(arr){
    var m = mean(arr);
    return sum(arr.map(function(i){return Math.pow(i-m, 2);}))/(number(arr) - 1);
}