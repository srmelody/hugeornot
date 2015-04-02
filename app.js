var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var swig = require('swig');
var db = require('./lib/db');
var demoData = require('./lib/demoData');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passportConfig = require('./lib/config/passport');
var authenticated = require('./lib/middleware/authenticated');
/*var routes = require('./routes/index');
var users = require('./routes/users');*/

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

function defaultContentTypeMiddleware (req, res, next) {
	// This is a hack, I need to figure out how to change aurelia to send the correct content-type
  req.headers['content-type'] = 'application/json';
  next();
}


app.use(defaultContentTypeMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(
	{ 	name: 'hugeornot.sid',
		secret: 'hugenots in charleston' ,  
	  	store: new MongoStore( {url: 'mongodb://localhost:27017/hugeornotDev'} )
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(allowCrossDomain);
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var api = require('./routes/api');
app.use('/api', authenticated.isAuthenticated, api);
var oauth = require("./routes/oauth");
app.use('/oauth', oauth);

app.get('/', function(req, res) {
  res.redirect('/app/');
});

// app.use('/api', );
// app.use('/api/votes/me',  );


var debug = require('debug')('aurelia-node');

app.set('port', process.env.PORT || 9000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

demoData.load();

module.exports = app;
