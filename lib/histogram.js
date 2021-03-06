function Histogramm(init){
    if(init){
        if(typeof init == 'number') this.addValue(init);
        else if(init.map) this.addRange(init);
        else {
            Object.keys(init).map(function(k){
                return parseFloat(k);
            }).filter(function(k){
                return !isNaN(k);
            }).map(function(k){
                return {value: k, count: parseInt(this[k], 10)};
            }, init).filter(function(obj){
                return !isNaN(obj.count);
            }).map(function(obj){
                this[obj.value] = obj.count;
            }, this);
        }
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

Histogramm.prototype.map = function(callback, thisArg){
    if(typeof callback != 'function'){
        throw new TypeError('Callback should be a function');
    }
    return Object.keys(this).map(function(value){
        if(thisArg){
            return callback.call(thisArg,{value: parseFloat(value), count: this[value]});
        } else {
            return callback({value: parseFloat(value), count: this[value]});
        }
    }, this);
};

Histogramm.prototype.reduce = function(callback, initialValue){
    return this.map(function(v){
        return v;
    }, this).reduce(callback, initialValue || 0);
};

Histogramm.prototype.sum = function(){
    return this.reduce(function(prev, next){
        return prev + next.value*next.count;
    });
};

Histogramm.prototype._length = function(){
    return Object.keys(this).length;
};

Histogramm.prototype._count = function(){
    return this.reduce(function(prev, next){
        return prev + next.count;
    });
};

Object.defineProperty(Histogramm.prototype, 'length', {
    enumerable: false,
    configurable: false,
    get: function(){
        return this._length();
    }
});

Object.defineProperty(Histogramm.prototype, 'count', {
    get: function(){
        return this._count();
    },
    enumerable: false,
    configurable: false
});

Histogramm.prototype.number = function(){
    return this._count();
};

Histogramm.prototype.mean = function(){
    return this._count() > 0 ? this.sum()/this._count(): 0;
};

Histogramm.prototype.variance = function(){
    var mean = this.mean();

    return this.reduce(function(prev, next){
        return prev + Math.pow(next.value - mean, 2)*next.count;
    })/(this._count() - 1);
};

Histogramm.prototype.standardDeviation = function(){
    return Math.sqrt(this.variance());
};

Histogramm.prototype.getByIndex = function(index){
    if(index < 0 || index > this._count()){
        throw new TypeError('Index out of the border: ' + index + ' out of ' + this._count());
    }

    var sorted = this.getValues().sort(function(a,b){ return a-b; });
    var counts = sorted.map(function(val){
        return this[val];
    }, this);
    var indexed = [];
    var count = 0;
    for(var i = 0; i < counts.length; i++){
        indexed.push(count);
        count += counts[i];
    }
    indexed.push(count);
    indexed.shift();
    var resIndex = 0;
    while(indexed[resIndex++] <= index);
    return sorted[resIndex-1];
};

Histogramm.prototype.percentile = function(p){
    var count = this._count();
    if(count == 0) return 0;
    var last = count - 1;
    p = parseFloat(p);
    if(p === 100){
        return this.getByIndex(last);
    }
    var rank = p / 100.0 * last;
    var lrank = Math.floor(rank);
    var d = rank - lrank;
    var lower = this.getByIndex(lrank);
    var upper = this.getByIndex(lrank+1);
    return lower + (upper - lower)*d;
};

Histogramm.prototype.median = function(){
    return this.percentile(50);
};

module.exports = Histogramm;