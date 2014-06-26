var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

// exports.readListOfUrls = function(filePath){
//   return fs.readFileSync(filePath);
// };
exports.readListOfUrls = function(iterator){
  // create arrayOfUrls
  var urls = fs.readFileSync(this.paths.list).toString().split('\n');
  iterator(urls);
};

exports.isUrlInList = function(requestedUrl){
  requestedUrl = requestedUrl.slice(1);
  this.readListOfUrls(function(urlArr){
    if (urlArr.indexOf(requestedUrl) === -1){
      return false;
    }else{
      return true;
    }
  });
};


// exports.isUrlInList = function(fileContents, requestedUrl){
//   requestedUrl = requestedUrl.slice(1);
//   if ( fileContents.indexOf(requestedUrl) === -1 ){
//     return false;
//   }
//   return true;
// };

exports.addUrlToList = function(requestedUrl){
  // append url to sites.txt
  requestedUrl = requestedUrl.slice(1) + "\n";
  fs.appendFile(this.paths.list, requestedUrl);
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
