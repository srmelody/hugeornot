var Tenant, _, async, db, mongoose, util, winston, wsapi;



wsapi = require("./wsapiService");

db = require('../lib/db');

util = require('util');

winston = require("winston");


async = require("async");

_ = require("lodash");
var userCollection = db.collection('users');

exports.successfulOauth = function(accessToken, callback) {
  return async.auto({
    wsapiUser: [
      function(callback) {
        return wsapi.getUser(accessToken, callback);
      }
    ],
   
    mongoUser: [
      'wsapiUser' , function(callback, arg) {
        console.log("Wsapi user: " , arg );
        var wsapiUser = arg.wsapiUser;
        var uuid = wsapiUser.User._refObjectUUID;
        userCollection.find({uuid: uuid}, callback);
        
      }
    ],
    savedUser: [
      'mongoUser', 'wsapiUser', function(callback, arg) {
        var User, mongoUser,  sub, u, user, wsapiUser;
        mongoUser = arg.mongoUser, wsapiUser = arg.wsapiUser;
        winston.info(" here at savedUser args:" ,  arg);
        
        u = wsapiUser.User;
        sub = wsapiUser.User.Subscription;
     
        user = {
          name: u.FirstName + " " + u.LastName,
          provider: "rally",

          email: u.EmailAddress,
          
          uuid: u._refObjectUUID,
          rally: {
            subscriptionAdmin: u.SubscriptionAdmin,
            subscription: {
              id: sub._refObjectUUID,
              name: sub._refObjectName
            },
            accessToken: accessToken
          }
        };
        if (_.isEmpty(mongoUser)) {
          winston.info("Creating new user ",user);
          return userCollection.insert(user, callback);
        } else {

          mongoUser = _.extend(mongoUser, user);
          winston.info("updating old user ", JSON.stringify(mongoUser));

          return userCollection.save(mongoUser[0], callback);
          
        }
      }
    ]
  }, function(err, arg) {
    var savedUser, tenant;
    savedUser = arg.savedUser;
    if (_.isArray(savedUser)) {
      savedUser = savedUser[0];
    }
    winston.info("Arguments in callback " + (JSON.stringify(arguments)));
   
    return callback(err, savedUser);
  });
};

exports.findByEmail = function(email, callback) {
  var User;
  User = db.model("User");
  return User.findOne({
    email: email
  }, callback);
};

exports.findById = function(id, callback) {
 
  return userCollection.find({_id: id},  callback);
};

exports.changePassword = function(userId, oldPassword, newPassword, callback) {
  var User;
  User = db.model("User");
  return User.findById(userId, function(err, user) {
    if (user.authenticate(oldPassword)) {
      user.password = newPassword;
      return user.save(function(err) {
        return callback(err, true, user);
      });
    } else {
      return callback(null, false, user);
    }
  });
};

exports.save = function(user, callback) {
  return user.save(callback);
};

exports.all = function(callback) {
  var User;
  User = db.model("User");
  return User.find().select("roles email name uuid provider").exec(callback);
};

exports.upsert = function(body, currentUser, callback) {
  var User, userId;
  User = db.model('User');
  userId = body._id;
  return async.auto({
    user: (function(_this) {
      return function(callback) {
        return User.findById(userId).exec(callback);
      };
    })(this),
    checkRole: [
      'user', (function(_this) {
        return function(callback, arg) {
          var user;
          user = arg.user;
          if (_.contains(body.roles, "root") && (!user || !_.contains(user.roles, "root"))) {
            if (!_.contains(currentUser.roles, "root")) {
              callback(new Error("Cannot grant root access if you are not root"), null);
            }
          }
          return callback(null, true);
        };
      })(this)
    ],
    update: [
      'user', 'checkRole', (function(_this) {
        return function(callback, arg) {
          var user;
          user = arg.user;
          if (user) {
            user = _.extend(user, body);
          } else {
            user = new User(body);
          }
          user.tenant = currentUser.tenant;
          return user.save(callback);
        };
      })(this)
    ]
  }, function(err, result) {
    if (err != null) {
      winston.error("Error upserting user: " + err);
      return callback(err, null);
    } else {
      winston.info("Calling back in userService with " + JSON.stringify(result.update));
      winston.info("Callback: " + callback);
      winston.info("err: " + err);
      return callback(err, result.update);
    }
  });
};