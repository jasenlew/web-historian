var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelper = require('./http-helpers');

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);

  if (req.method === 'GET') {
    httpHelper.serveAssets(res, req.url, req.method);
  }

  if( req.method === 'POST'){
    var body = '';

    req.on("data", function (chunk) {
      body += chunk;
    });

    req.on("end", function () {
      var qs = require("querystring");
      var postedData = qs.parse(body);
      postedData.url  = '/' + postedData.url;
      httpHelper.serveAssets(res, postedData.url, req.method);
    });
  }

};
