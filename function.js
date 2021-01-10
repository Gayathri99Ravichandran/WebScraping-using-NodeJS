
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

function scrapeProduct(url)
{
var count = 0;
var name = {};
var allfiles;
var nameobj = {"DEBfiles":[]};
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


