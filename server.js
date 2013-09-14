var st = require('st')
var http = require('http')

var mount = st({ path: __dirname + '/src', url: '/', index: 'index.html'})
http.createServer(function(req, res) {
  var stHandled = mount(req, res);
  if (stHandled)
    return
  else
    res.end('this is not a static file')
}).listen(8080)
