const express = require('express') ;
const app = express();
const port = 8080;
const scraper = require('./function.js');
const allfiles = require('./function');

app.get("/", async (req,res) => 
{
    var filenames = scraper.scrapeProduct('http://apt.postgresql.org/pub/repos/apt/pool/14/p/postgresql-14/');
    const files = require('./list.json');
    res.setHeader('Content-type','text/html')
    res.write('<html><body><center><h1>National Informatics Centre</h1><h3>FILE LIST</h3><select>');
    
    for(i=0;i<files.DEBfiles.length; i++)
    {
    res.write('<option>'+files.DEBfiles[i]+'</option>');
    }
    res.write('</select></center></body></html>');
    res.end();
});

app.listen(port, ()=> console.log("Listening on port" + port));

