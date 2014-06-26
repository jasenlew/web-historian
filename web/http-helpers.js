var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var filePath;
  // check if asset is /
  if ( asset === '/' ){
  filePath = archive.paths.siteAssets + '/index.html';
  fs.readFile(filePath, function (err, data) {
    if (!err) {
      res.writeHead(200, this.headers);
      res.end(data);
    } else {
      throw err;
    }
  });
  } else {
  if ( archive.isUrlInList(asset) ) {
    var sitePath = archive.paths.archivedSites + asset;
    fs.readFile(sitePath, function (err, data) {
      if (!err) {
        res.writeHead(200, this.headers);
        res.end(data);
      } else {
        throw err;
      }
    });
  }else{
    // add url to list
    archive.addUrlToList(asset);
    res.writeHead(404, this.headers);
    res.end('google');
  }
  }
};

// As you progress, keep thinking about what helper functions you can put here!
