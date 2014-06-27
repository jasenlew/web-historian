var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var fetcher = require('../workers/htmlfetcher');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, method) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var filePath;
  var sitePath;

  // GET
  // 1. localhost:8080/ === index.html
  // 2. localhost:8080/www.google.com
    //  return the archived content of www.google.com
    //  return 404 if it doesn't exist

  if (method === 'GET') {
    if ( asset === '/' ){
      filePath = archive.paths.siteAssets + '/index.html';
      this.readFile(filePath, res, 200);
    } else {
      // console.log("Asset: " + asset);
      // console.log("Boolean: " + archive.isUrlInList(asset));
      if ( archive.isUrlInList(asset) ) {
        sitePath = archive.paths.archivedSites + asset;
        this.readFile(sitePath, res, 200);
      } else {
        res.writeHead(404, this.headers);
        res.end('FILE NOT FOUND.');
      }
    }
  }

  // POST
    // 1. user-submitted url exists in archive/sites.txt
      // return the content
    // 2. doesn't exist in archive/sites.txt
      //a serve loading.html
      //b append to the list
      //c initiaties and get the html fetcher to fetch the content from the web
      //d serve the user-requested content when the fetcher comes back with the content

  if (method === 'POST') {
    if ( archive.isUrlInList(asset) ) {
      sitePath = archive.paths.archivedSites + asset;
      this.readFile(sitePath, res, 302);
    } else {
      archive.addUrlToList(asset);
      fetcher.fetcher(asset);
      sitePath = archive.paths.siteAssets + '/loading.html';
      this.readFile(sitePath, res, 302);
      archive.addUrlToList(asset);
    }
  }

};

// As you progress, keep thinking about what helper functions you can put here!

exports.readFile = function(sitePath, res, statusCode) {
  fs.readFile(sitePath, function (err, data) {
    if (!err) {
      res.writeHead(statusCode, this.headers);
      res.end(data);
    } else {
      throw err;
    }
  });
};
