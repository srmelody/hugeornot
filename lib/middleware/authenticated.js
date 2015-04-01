var AuthenticationError, path, winston;

path = require('path');

winston = require('winston');


exports.isAuthenticated = function(req, res, next) {
  var ref;
  winston.info("is authenticated called");
  if ((req.user != null) && (req.user.tenant != null)) {
    if (((ref = req.session) != null ? ref.requestedPath : void 0) != null) {
      delete req.session.requestedPath;
    }
    return next(req, res);
  } else {
    winston.info("unauthenticated req.user:  " + (JSON.stringify(req.user)));
    if (req.session.requestedPath == null) {
      req.session.requestedPath = req.path;
    }
    if( req.path === '/oauth/login') {
      next(req,res);
    }
    else {
      return res.redirect( "http://localhost:7000/oauth/login");
    }
  }
};