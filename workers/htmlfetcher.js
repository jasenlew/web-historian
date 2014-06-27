// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var archive = require('../helpers/archive-helpers');
var httpRequest = require('http-request');
var fs = require('fs');


exports.fetcher = function(url){
  httpRequest.get('jasenlew.com', function (err, res) {
    if (err) {
      console.log('there is an error');
      throw err;
    }else{
      console.log('there is nooooo error');
      var content = res.buffer.toString();
      var filePath = archive.paths.archivedSites + '/' + url;
      fs.writeFile(filePath, content);
    }
  });
};

// fetch a single url
  // read sites.txt
  // check if each url in list has been archived or not
  // if yes, do nothing
  // if not, download the url
    // make a get request to the url
    // get the content and write content to sites folder

httpRequest.get('jasenlew.com', function (err, res) {
  if (err) {
    throw err;
  }else{
    var content = res.buffer.toString();
    var filePath = archive.paths.archivedSites + '/' + url;
    fs.writeFile(filePath, content);
  }
});
