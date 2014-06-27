// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var archive = require('../helpers/archive-helpers');
var request = require('request');
var fs = require('fs');


exports.fetcher = function(url){
  if (url.slice(0,1) === '/'){
    url = url.slice(1);
  }
  request({
      uri: 'http://' + url,
      method: "GET"
  }, function(error, res, body) {
    var filePath = archive.paths.archivedSites + '/' + url;
    fs.writeFile(filePath, body);
  });
};

archive.downloadUrls();


// fetch a single url
  // read sites.txt
  // check if each url in list has been archived or not
  // if yes, do nothing
  // if not, download the url
    // make a get request to the url
    // get the content and write content to sites folder
