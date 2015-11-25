var Histogramm = require('../lib/histogram.js');

describe('Histogram', function(){
    var hist = null;
    beforeEach(function(){
        hist = new Histogramm();
    });

    it('should be an object', function(){
        expect(typeof hist).toEqual('object');
    });

    it('should add number values', function(){
        var add2 = function(){
            hist.addValue(2);
        };

        expect(add2).not.toThrow();
        expect(hist[2]).toEqual(1);
    });

    it('should add map values', function(){
        var addmap = function(){
            hist.addValue({value: 3, count: 4});
        };

        expect(addmap).not.toThrow();
        expect(hist[3]).toEqual(4);
    });

    it('should fail to add wrong objects', function(){
        var addobj = function(){
            hist.addValue({});
        };

        expect(addobj).toThrow();
    });


});
