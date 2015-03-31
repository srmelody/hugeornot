var mongojs = require('mongojs');
var db = mongojs('localhost:27017/hugeornotDev');

module.exports = db;