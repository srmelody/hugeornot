var getUserUrl, request, util, winston;

request = require("request");

winston = require("winston");

util = require('util');
var RALLY_URL = "https://test4cluster.rallydev.com"

exports.getUser = function(accessToken, callback) {
  winston.info("access token " + accessToken);
  if (accessToken === null) {
    return callback("Missing access token, WSAPI was not called.");
  } else {
    return request.get({
      url: getUserUrl(),
      headers: {
        zsessionid: accessToken
      }
    }, function(err, res, body) {
      var json;
      winston.debug("err " + err + " res " + res + " body " + body);
      if (err) {
        return callback(err, null);
      } else {
        json = JSON.parse(body);
        return callback(null, json);
      }
    });
  }
};

getUserUrl = function() {
  return RALLY_URL + "/slm/webservice/v2.x/user";
};