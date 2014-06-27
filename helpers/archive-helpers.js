var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};
// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(iterator){
  var urls = fs.readFileSync(this.paths.list).toString().split('\n');
  iterator(urls);
};

exports.isUrlInList = function(requestedUrl){
  requestedUrl = requestedUrl.slice(1);
  var result;
  this.readListOfUrls(function(urls){
    if (urls.indexOf(requestedUrl) === -1){
      result = false;
    }else{
      result = true;
    }
  });
  return result;
};


exports.addUrlToList = function(requestedUrl){
  // append url to sites.txt
  requestedUrl = requestedUrl.slice(1) + "\n";
  fs.appendFile(this.paths.list, requestedUrl);
};

exports.isURLArchived = function(){

};

exports.downloadUrls = function(){
  this.readListOfUrls(function (urls) {
    _.each(urls, function (url) {
      if (!isURLArchived(url)) {
        httpRequest.get(url, function (err, res) {
          if (err) {
            console.error(err);
            return;
          }
          var content = res.buffer.toString();
          fs.writeFile(this.paths.archivedSites, content);
        });
      }
    });
  });
};
