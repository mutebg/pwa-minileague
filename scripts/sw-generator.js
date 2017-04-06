/* eslint-disable */
var fs = require('fs');
var _ = require('lodash');
var exclude = ['sw.js', 'sw-toolbox.js', 'manifest.json', 'idb-keyval.js'];
var config = require('../app/config.production.js');

//read all files that have to be precashed
var fileList = fs.readdirSync('./build').filter(function(item) {
  return exclude.indexOf(item) < 0 && !_.endsWith(item, '.png');
});

//read SW template
var swTemplate = fs.readFileSync('./app/sw.js', 'utf8');
var swCompile = _.template(swTemplate);
var sw = swCompile({
  precache: '"' + fileList.join('","') + '"',
  hash: new Date().getTime(),
  api_url: config.API_URL,
});

//copy SW-toolbox script
fs
  .createReadStream('./node_modules/sw-toolbox/sw-toolbox.js')
  .pipe(fs.createWriteStream('./build/sw-toolbox.js'));

//save SW file
fs.writeFileSync('./build/sw.js', sw, 'utf8');

console.log('SW generated...');
