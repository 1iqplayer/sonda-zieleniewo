var http = require('http');
var url = require('url');
var fs = require('fs')

function readLast(file){
    let values = ['', '', ''];
    let look_at = 0;
    console.log(file.length);
    for (var i = 0; i < file.length; i++) {
        if (file[i] == ':') {look_at += 1;} else{
            values[look_at] = values[look_at] + file[i];
        }
    }
    return values;
}

http.createServer(function(req, res){
    var q = url.parse(req.url, true);
    var quer = q.query;

    if (q.pathname == '/')
    {
        fs.readFile('index.html', function(err, data) {
            if (err) {throw err}else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
          });
        return;
    }
    if (q.pathname == '/style.css')
    {
        fs.readFile('style.css', function(err, data) {
            if (err) {throw err}else{
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(data);
                return res.end();
            }
          });
        return;
    }
    if (q.pathname.includes('/media'))
    {
        fs.readFile(q.pathname.slice(1), function(err, data) {
            if (err) {throw err}else{
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(data);
                return res.end();
            }
          });
        return;
    }
    if (q.pathname.includes('/script'))
    {
        fs.readFile(q.pathname.slice(1), function(err, data) {
            if (err) {throw err}else{
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(data);
                return res.end();
            }
          });
        return;
    }
    if (q.pathname == '/update')
    {  
        var file = "";
        fs.readFile('readings/last', function(err, data) {
            if (err) {throw err}else{ 
                file = data.toString();
                console.log(file);
                let sensors = readLast(file);


        res.writeHead(200, {'Content-Type': 'text/plain'});
        let message = "T"+sensors[0]+"H"+sensors[1]+"P"+sensors[2];
        res.end(message);

            }
          });
        
        return;
    }
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end("error 404 page not found");
}).listen(80);