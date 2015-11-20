function Histogramm(init){
    if(init){
        if(typeof init == 'number') this.addValue(init);
        else this.addRange(init);
    }
}

Histogramm.prototype.addValue = function(value){
    if(typeof value != 'number'){
        throw new TypeError('Expected %s to be a number', typeof value);
    }
    if(!this[value]){
        this[value] = 0;
    }
    ++this[value];
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
