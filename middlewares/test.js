var TimeSpan = require('./TimeSpan');

var timespan = TimeSpan();
console.log(timespan.toJson());
var json = '{ days: 14, hours: 6, mins: 33, seconds: 43 }';
console.log(JSON.parse(JSON.stringify(json)));
console.log(TimeSpan().toMilliseconds({ days: 0, hours: 0, mins: 0, seconds: 3 }));
