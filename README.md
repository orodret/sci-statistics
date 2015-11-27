Scientific statistics
=====================

Overview
--------

 This module has several simple easy-to-use functions for descriptive statistics like mean, median, variance. Intended to be used in NodeJS. Based on https://github.com/FGRibreau/descriptive_statistics, but unlike it does not mix anything in the existing prototypes.

Installation
------------

```
> npm i scientific-statistics
```

Examples
--------

```
> var ds = require('scientific-statistics');
undefined
> var data = [2,4,2,54,25,32,5,23,12,43];
undefined
> ds.number(data);
10
> ds.sum(data);
202
> ds.mean(data);
20.2
> ds.median(data);
17.5
> ds.variance(data);
339.51111111111106
> ds.standardDeviation(data);
18.425827284306965
> ds.percentile(data, 20);
3.6
```

Class Histogramm
----------------

Class which store values in structure like value:count. Can be useful with long lists of repetitive values.
