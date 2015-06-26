var express = require('express');
var router = express.Router();
var voteService = require('../services/voteservice');
var estimateSessionService = require('../services/estimateSessionService');

var featureService = require('../services/featureService');

var _ = require("lodash");
var passport = require("passport");
var authenticated = require('../lib/middleware/authenticated');
/* GET users listing. */
router.get('/demo', function(req, res) {
  res.json({ msg: 'From the Node-Backend'});
});

router.get('/features', function(req, res) {


	featureService.get( req.body, function( err, data ) {

		res.json( {features: _.shuffle(data)} );
	});
});

router.get('/features/top', function(req, res) {


	featureService.rankFeatures( req.body, function( err, data ) {

		res.json( {features: data} );
	});
});

router.post('/votes', function( req, res ) {

	var user = req.user;
	console.log("voting as user ", user);
	var document = _.pick(req.body, ['user', 'biggerFeature', 'smallerFeature']);
	document.user = user;
	voteService.vote( document, function( err, data ) {
		console.log("Vote done", data, err );
		res.status(201).json(data);
	});
});





router.get('/votes/me', function( req, res ) {

	var user = req.user;
	console.log("my votes for  user ", user);
	voteService.myVotes( user, function( err, data ) {
		console.log("returning votes", data, err );
		res.status(201).json({votes: data });
	});
});


router.post('/estimatesession', function (req, res) {
  console.log("calling estimatesession");
  var estimatesession = req.body.estimatesession
  console.log("with", req);
  estimateSessionService.save(estimatesession, function( err, data) {
    res.status(201).json({estimatesession: data});
  });
});


/* GET welcome view */
router.get('/views/welcome', function(req, res) {
  res.render('welcome', {nodePort: require('../app').get('port')});
});

router.all('*', authenticated.setUserCookie);
router.all('*', authenticated.isAuthenticated);


module.exports = router;
