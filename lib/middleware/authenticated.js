var AuthenticationError, path, winston;

path = require('path');

winston = require('winston');
exports.isAuthenticated2= function(req, res, next) {
    winston.info("is authenticated called", req.user, req.path);
      winston.info("req is autehtnciated", req.isAuthenticated());
  winston.info("req", req.session);

    next();


}
exports.setUserCookie = function(req, res,next) {
  console.log("Totally calling set user cookie", req.user);

  if (req.user) {
    console.log("username", req.user);
   
  }
  next()
}
exports.isAuthenticated = function(req, res, next) {
  var ref;

  if (req.user != null) {
    if (((ref = req.session) != null ? ref.requestedPath : void 0) != null) {
      delete req.session.requestedPath;
    }
    res.cookie( "username", req.user.name);
    return next();
  } else {
    winston.info("unauthenticated req.user:  " + (JSON.stringify(req.user)));
    if (req.session.requestedPath == null) {
      req.session.requestedPath = '/api/' + req.path;
    }
    if (req.session.requestedPath.indexOf('/api') == 0) {
      return res.status(401).send("unauthenticated");
    }
    if( req.path === '/oauth/login') {
      winston.info("Found login");
      return next();
    }
    else {
      winston.info("Redirecting to login");
      //next(req,res);
      return res.redirect( "http://localhost:7000/oauth/login");
    }
  }
};