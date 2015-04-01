var express = require('express');
var router = express.Router();
var voteService = require('../services/voteservice');
var _ = require("lodash");
var passport = require("passport");
/* GET users listing. */
router.get('/api/demo', function(req, res) {
  res.json({ msg: 'From the Node-Backend'});
});

router.get('/api/features', function(req, res) {

	
	voteService.get( req.body, function( err, data ) {
		console.log("Vote", data, err );
		res.json( {features: _.shuffle(data)} );
	});
});

router.post('/api/votes', function( req, res ) {

	console.log("Req", req.body);
	voteService.vote( req.body, function( err, data ) {
		console.log("Vote", data, err );
		res.status(201).json(data);	
	});
});




router.get("/oauth/redirect", passport.authenticate('oauth2', {failureRedirect: "http://localhost:7000/login"}), function(req, res, next) {
		console.log("callback from oauth with request path", req.session.requestedPath);
		next(req, res);
		//res.redirect(req.session.requestedPath)
		//delete req.session.requestedPath
	}
);


router.get('/api/votes/me', function( req, res ) {

	console.log("Req", req.body);
	var user = "sean";
	voteService.myVotes( user, function( err, data ) {
		console.log("Vote", data, err );
		res.status(201).json({votes: data });	
	});
});
router.get('/', function(req, res) {
  res.redirect('/app/');
});

/* GET welcome view */
router.get('/views/welcome', function(req, res) {
  res.render('welcome', {nodePort: require('../app').get('port')});
});

router.get('/oauth/login', passport.authenticate('oauth2'))


module.exports = router;
