var http = require('http'),
    ejs = require('ejs'),
    express = require('express'),
    bodyParser = require('body-parser');

/*******************************
 *
 *   CONFIG
 *
 *******************************/
var port = process.env.PORT || 8000,
    app = express(),
    server = http.createServer(app),
    io = require('socket.io')(server);

app.use(bodyParser.urlencoded());

app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

var CastService = require('./src/CastService');
var castServiceInstance = new CastService(io);
console.info("CastService is initialized", castServiceInstance);

require('./src/routes.js')(app, castServiceInstance);

/*******************************
 *
 *   ERROR
 *
 *******************************/

app.use(function (req, res) {
    res.render("error");
});

/*******************************
 *
 *   LISTEN
 *
 *******************************/

server.listen(port);
console.log('Server started on port : ' + port);