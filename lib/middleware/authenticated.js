var AuthenticationError, path, winston;

path = require('path');

winston = require('winston');
exports.isAuthenticated = function(req, res, next) {
    winston.info("is authenticated called", req.user, req.path);
    next();


}
exports.isAuthenticated2 = function(req, res, next) {
  var ref;
  winston.info("is authenticated called", req.user, req.path);
  winston.info("req is autehtnciated", req.isAuthenticated());
  if (req.user != null) {
    if (((ref = req.session) != null ? ref.requestedPath : void 0) != null) {
      delete req.session.requestedPath;
    }
    return next();
  } else {
    winston.info("unauthenticated req.user:  " + (JSON.stringify(req.user)));
    if (req.session.requestedPath == null) {
      req.session.requestedPath = req.path;
    }
    if( req.path === '/oauth/login') {
      winston.info("Found login");
      next();
    }
    else {
      winston.info("Redirecting to login");
      //next(req,res);
      return res.redirect( "http://localhost:7000/oauth/login");
    }
  }
};