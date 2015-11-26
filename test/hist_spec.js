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

    describe('Histogramm.getValues', function(){
        it('should return array of the right length', function(){
            hist.addRange([1,4,6,2,4,2,5,6,7,8]);
            var values = hist.getValues();

            expect(values instanceof Array).toBeTruthy();
            expect(values.length).toEqual(7);
        });

        it('should contain right values', function(){
            hist.addRange([2,3,5,2,1]);
            var values = hist.getValues();

            expect(values).toContain(2);
            expect(values).toContain(3);
            expect(values).toContain(5);
            expect(values).toContain(1);
        });
    });

    describe('Histogramm.map', function(){
        it('should pass right objects', function(){
            hist.addRange([1,3,3]);
            var map = hist.map(function(v){ return v; });
            expect(map.length).toEqual(2);
            expect(map[0].value).toEqual(1);
            expect(map[0].count).toEqual(1);
            expect(map[1].value).toEqual(3);
            expect(map[1].count).toEqual(2);
        });

        it('should transform values', function(){
            hist.addRange([1,1,2,4,2,1,5]);
            var map = hist.map(function(v){ return v.count; });

            expect(map.length).toEqual(4);
            expect(map).toContain(1);
            expect(map).toContain(2);
            expect(map).toContain(3);
            expect(map.filter(function(i){return i == 1;}).length).toEqual(2);
        });

        it('should fail with no callback', function(){
            expect(function(){ hist.map(); }).toThrow();
            expect(function(){ hist.map({}); }).toThrow();
        })
    });

    describe('Histogramm.reduce', function(){
        it('should calculate right reduction', function(){
            var init = [1,1,2,4,2,2,4];
            hist.addRange(init);
            var counts = hist.reduce(function(prev, next){ return prev.push(next.count); }, []);

            expect(counts.length).toEqual(init.length);
            expect(counts).toContain(2);
            expect(counts).toContain(3);
            expect(counts).not.toContain(1);
        });

        it('should use 0 as default initValue', function(){
            var init = [1,1,2,4,2,2,4];
            hist.addRange(init);
            var len = 0;
            var lenfunc = function(){
                len = hist.reduce(function(prev, next){ return prev + next.count; });
            };

            expect(lenfunc).not.toThrow();
            expect(len).toEqual(init.length);
        });

        it('should fail with no callback', function(){
            var init = [1,1,2,4,2,2,4];
            hist.addRange(init);
            expect(function(){hist.reduce();}).toThrow();
            expect(function(){hist.reduce({});}).toThrow();
        });
    });
});
