const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
function timestamp()
{
  var ts = "";
  let milliseconds = Date.now();
  let timestamp = new Date(milliseconds);
  let date = timestamp.getDate();
  let month = timestamp.getMonth() + 1;
  let year = timestamp.getFullYear();
  let hour = timestamp.getHours();
  let minutes = timestamp.getMinutes();
  let seconds = timestamp.getSeconds();
  ts= year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + seconds;
  return ts;
}
function scrapeProduct(url)
{
var count = 0;
var name = {};
var allfiles;

var nameobj = {"URL":null,"TimeStamp":null,"DEBfiles":[]};
request(url,(err, resp, html)=>
{
const $ = cheerio.load(html);
$("a").each((index, link)=>
{
var path = require('path');
var linkurl = $(link).attr('href');
name[count] = path.basename(linkurl) ;
nameobj.DEBfiles[count] = name[count];
count++; 
});
var ts = timestamp();
nameobj.TimeStamp=ts;
nameobj.URL=url;
allfiles = JSON.stringify(nameobj);
fs.writeFile('list.json', allfiles, (err) => {
  if (err) {
      throw err;
  }
  console.log("JSON data is saved.");

});        
});    
}
scrapeProduct('http://apt.postgresql.org/pub/repos/apt/pool/14/p/postgresql-14/');
module.exports = {scrapeProduct};


