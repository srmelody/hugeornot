var express = require('express');
var router = express.Router();
var voteService = require('../services/voteservice');
var _ = require("lodash");
var passport = require("passport");
var authenticated = require('../lib/middleware/authenticated');
/* GET users listing. */
router.get('/demo', function(req, res) {
  res.json({ msg: 'From the Node-Backend'});
});

router.get('/features', function(req, res) {

	
	voteService.get( req.body, function( err, data ) {
		console.log("Vote", data, err );
		res.json( {features: _.shuffle(data)} );
	});
});

router.post('/votes', function( req, res ) {

	console.log("Req", req.body);
	voteService.vote( req.body, function( err, data ) {
		console.log("Vote", data, err );
		res.status(201).json(data);	
	});
});





router.get('/votes/me', function( req, res ) {

	console.log("Req", req.body);
	var user = "sean";
	voteService.myVotes( user, function( err, data ) {
		console.log("Vote", data, err );
		res.status(201).json({votes: data });	
	});
});


/* GET welcome view */
router.get('/views/welcome', function(req, res) {
  res.render('welcome', {nodePort: require('../app').get('port')});
});


router.all('*', authenticated.isAuthenticated);
// router.all('*', authenticated.isAuthenticated);
module.exports = router;
