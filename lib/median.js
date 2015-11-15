var percentile = require('./percentile.js');

module.exports = function(arr){
    return percentile(arr, 50);
};
