var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelper = require('./http-helpers');

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);

  if (req.method === 'GET') {
    res.writeHead(200, httpHelper.headers);
    httpHelper.serveAssets(res, req.url);
  }
  //check whether type of request method is GET
  // if get
    // write the header and pass in status code of 200
    // respond back with the index.html content
  // then

};
