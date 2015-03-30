var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api/demo', function(req, res) {
  res.json({ msg: 'From the Node-Backend'});
});

router.get('/api/features', function(req, res) {
	var features = [{
		id: 1,
  		name: "Rebuild the hoover dam",
  		description: "I think we should rearchitect it.  Old stuff cannot be as awesome as new stuff"
  	}, {
  		id: 2,
  		name: "Give my cat a bath",
  		description : "The cat hates water but needs a bath"
  	}];
	res.json( {features: features} );
});

router.post('/api/votes', function( req, res ) {

	console.log("Req", req.body);
	res.status(200).end();
});

router.get('/', function(req, res) {
  res.redirect('/app/');
});

/* GET welcome view */
router.get('/views/welcome', function(req, res) {
  res.render('welcome', {nodePort: require('../app').get('port')});
});

module.exports = router;
