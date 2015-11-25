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

    describe('Histogramm.addRange', function(){
        it('should add array of numbers', function(){
            var addarr = function(){
                hist.addRange([2,3,6,6,3,3]);
            };
            expect(addarr).not.toThrow();
            expect(hist[2]).toEqual(1);
            expect(hist[3]).toEqual(3);
            expect(hist[6]).toEqual(2);
        });

        it('should add array of mapObjects', function(){
            var addmaps = function(){
                hist.addRange([{value: 2, count: 4}, {value:3, count: 6}]);
            };
            expect(addmaps).not.toThrow();
            expect(hist[2]).toEqual(4);
            expect(hist[3]).toEqual(6);
        });

        it('should fail with other inputs', function(){
            var addnotarray = function(){
                hist.addRange({});
            };

            var addbadarray = function(){
                hist.addRange([{}, null]);
            };

            expect(addnotarray).toThrow();
            expect(addbadarray).toThrow();
        });
    });
});
