/*
Define sum function
 */

module.exports = function(arr){
    return arr.reduce(function(prev, next){
        return prev + next;
    }, 0);
};

