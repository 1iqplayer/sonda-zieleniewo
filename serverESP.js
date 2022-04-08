var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var quer = q.query;

    if (q.pathname == '/check'){
        let ts = new Date();
        let when = ts.getHours().toString() + ":" + ts.getMinutes().toString() +":" +ts.getSeconds().toString();
        let readings = ":" + quer.temp + ":" + quer.humidity + ":" + quer.pressure;
        
        let file_path = "readings/" + (ts.getDay() + 1).toString() + "." + ts.getMonth().toString();
        fs.appendFile(file_path, when + readings + '\n', function (err) {
            if (err) {throw err}else{
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end('Checked succesfully!');
            };
            });
        return;
    }

    res.writeHead(200, {'content-type': 'text/plain'});
    res.end('enter /time or /check');
  }).listen(8080);

