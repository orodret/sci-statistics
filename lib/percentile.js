var number = require('./number.js');

module.exports = function(arr, p){
    var sorted = arr.sort(function(a,b){
        return a-b;
    });

    var length = number(sorted);
    var last = length - 1;

    p = parseFloat(p);
    if(p === 100){
        return sorted[last];
    }
    var rank = p / 100.0 * last;
    var lrank = Math.floor(rank);
    var d = rank - lrank;
    var lower = sorted[lrank];
    var upper = sorted[lrank + 1];
    return lower + (upper - lower)*d;
};