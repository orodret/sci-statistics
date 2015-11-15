var csv = require('csv');
var fs = require('fs');

var ds = require('../index.js');

describe('Statistics object', function(){
    it('should be object', function(){
        expect(ds).toBeDefined();
        expect(typeof ds).toEqual('object');
    });

    it('should contain mean function', function(){
        expect(ds.mean).toBeDefined();
        expect(typeof ds.mean).toEqual('function');
    });

    it('should contain median function', function(){
        expect(ds.median).toBeDefined();
        expect(typeof ds.median).toEqual('function');
    });

    it('should contain number function', function(){
        expect(ds.number).toBeDefined();
        expect(typeof ds.number).toEqual('function');
    });

    it('should contain percentile function', function(){
        expect(ds.percentile).toBeDefined();
        expect(typeof ds.percentile).toEqual('function');
    });

    it('should contain standardDeviation function', function(){
        expect(ds.standardDeviation).toBeDefined();
        expect(typeof ds.standardDeviation).toEqual('function');
    });

    it('should contain sum function', function(){
        expect(ds.sum).toBeDefined();
        expect(typeof ds.sum).toEqual('function');
    });

    it('should contain variance function', function(){
        expect(ds.variance).toBeDefined();
        expect(typeof ds.variance).toEqual('function');
    });
});

describe('DS functions:', function(){
    var data = [];
    var results = [];

    beforeEach(function(done){
        data = [];
        results = [];
        fs.createReadStream('test/testdata.csv')
            .pipe(csv.parse())
            .pipe(csv.transform(function(record){
                return record.map(parseFloat);
            }))
            .on('data', function(record){
                data.push(record.slice(0, 26));
                results.push(record.slice(26));
            })
            .on('end', function(){
                done();
            });
    });

    describe('Mean function', function(){
        it('should return mean values', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.mean(row) - results[i][0])).toBeLessThan(1e-7);
            });
        });
    });

    describe('Median function', function(){
        it('should return median values', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.median(row)-results[i][1])).toBeLessThan(1e-7);
            });
        });
    });

    describe('Variance function', function(){
        it('should return variance values', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.variance(row) - results[i][2])).toBeLessThan(1e-6);
            });
        });
    });

    describe('Standard deviation function', function(){
        it('should return std deviation values', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.standardDeviation(row) - results[i][3])).toBeLessThan(1e-7);
            });
        });
    });

    describe('Number function', function(){
        it('should return number values', function(){
            data.map(function(row, i){
                expect(ds.number(row)).toEqual(results[i][13]);
            });
        });
    });

    describe('Sum function', function(){
        it('should return sum values', function(){
            data.map(function(row, i){
                expect(ds.sum(row)).toEqual(results[i][12]);
            });
        });
    });

    describe('Percentile function', function(){
        it('should return percentile values for 10', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.percentile(row, 10) - results[i][4])).toBeLessThan(1e-7);
            });
        });

        it('should return percentile values for 25', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.percentile(row, 25) - results[i][5])).toBeLessThan(1e-7);
            });
        });

        it('should return percentile values for 30', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.percentile(row, 30) - results[i][6])).toBeLessThan(1e-7);
            });
        });

        it('should return percentile values for 50', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.percentile(row, 50) - results[i][7])).toBeLessThan(1e-7);
            });
        });

        it('should return percentile values for 60', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.percentile(row, 60) - results[i][8])).toBeLessThan(1e-7);
            });
        });

        it('should return percentile values for 75', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.percentile(row, 75) - results[i][9])).toBeLessThan(1e-7);
            });
        });

        it('should return percentile values for 90', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.percentile(row, 90) - results[i][10])).toBeLessThan(1e-7);
            });
        });

        it('should return percentile values for 100', function(){
            data.map(function(row, i){
                expect(Math.abs(ds.percentile(row, 100) - results[i][11])).toBeLessThan(1e-7);
            });
        });
    });
});