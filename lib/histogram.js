function Histogramm(init){
    if(init){
        if(typeof init == 'number') this.addValue(init);
        else this.addRange(init);
    }
}

Histogramm.prototype.addValue = function(value){
    if(typeof value != 'number' && !value.value && !value.count){
        throw new TypeError('Expected ' + typeof value + ' to be a number');
    }
    var val = value.value || value;
    if(!this[val]){
        this[val] = 0;
    }
    if(value.count) this[val] += value.count;
    else ++this[val];
};

Histogramm.prototype.addRange = function(arr){
    if(typeof arr != 'object' || !arr.map || typeof arr.map != 'function'){
        throw new TypeError('Expected ' + typeof arr +' to have map()');
    }
    var that = this;
    arr.map(function(value){ that.addValue(value); });
};

Histogramm.prototype.getValues = function(){
    return Object.keys(this).map(function(value){return parseFloat(value);});
};

Histogramm.prototype.map = function(callback){
    if(typeof callback != 'function'){
        throw new TypeError('Callback should be a function');
    }
    return Object.keys(this).map(function(value){
        return callback({value: parseFloat(value), count: this[value]});
    }, this);
};

Histogramm.prototype.reduce = function(callback, initialValue){
    var val = initialValue || 0;
    this.map(function(v){
        val = callback(val, v);
    });
    return val;
};

Histogramm.prototype.sum = function(){
    return this.reduce(function(prev, next){
        return prev + next.value*next.count;
    });
};

Object.defineProperty(Histogramm.prototype, 'length', {
    get: function(){
        return Object.keys(this).length;
    },
    writable: false,
    enumerable: false,
    configurable: false
});

Object.defineProperty(Histogramm.prototype, 'count', {
    get: function(){
        return this.reduce(function(prev, next){
            return prev + next.count;
        });
    },
    writable: false,
    enumerable: false,
    configurable: false
});

module.exports = Histogramm;