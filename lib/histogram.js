function Histogramm(init){
    if(init){
        if(typeof init == 'number') this.addValue(init);
        else this.addRange(init);
    }
}

Histogramm.prototype.addValue = function(value){
    if(typeof value != 'number' && !value.value && !value.count){
        throw new TypeError('Expected %s to be a number', typeof value);
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
        throw new TypeError('Expected %s to have map()', typeof arr);
    }
    var that = this;
    arr.map(function(value){ that.addValue(value); });
};

Histogramm.prototype.getValues = function(){
    return Object.keys(this).map(function(value){return parseFloat(value);});
};

Histogramm.prototype.map = function(callback){
    return Object.keys(this).map(function(value){
        return callback({value: parseFloat(value), count: this[value]});
    });
};