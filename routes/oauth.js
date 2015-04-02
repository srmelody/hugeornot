var express = require('express');
var router = express.Router();
var passport = require("passport");


router.get("test", function(req,res,next) {
	res.json("test");
});

router.get("/redirect", passport.authenticate('oauth2', {failureRedirect: "http://localhost:7000/login"}), function(req, res, next) {
		console.log("callback from oauth with request path", arguments);
		//next(req, res);
		//res.json({authenticated: req.isAuthenticated(), session: req.session});
		res.cookie("access", req.user.accessToken);
		res.redirect('/')
		//delete req.session.requestedPath
	}
);
router.get('/login', passport.authenticate('oauth2'), function(req,res, next) {
	console.log("Handling login", arguments);
	next();
});

module.exports = router;