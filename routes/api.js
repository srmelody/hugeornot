var express = require('express');
var router = express.Router();
var voteService = require('../services/voteservice');
var _ = require("lodash");
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

router.get('/', function(req, res) {
  res.redirect('/app/');
});

/* GET welcome view */
router.get('/views/welcome', function(req, res) {
  res.render('welcome', {nodePort: require('../app').get('port')});
});

module.exports = router;
