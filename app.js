var express = require('express');
var bodyParser = require('body-parser');
const db = require('./app/config/db.config');
const { readAllBlock } = require('./ReadAllBlock')
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
db.sequelize.sync();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(express.static(__dirname + '/public')); //Serves resources from public folder
require('./app/router/users')(app);
require('./app/router/payments')(app);
require('./app/router/followings')(app);
require('./app/router/transactions')(app);

var server_port = process.env.YOUR_PORT || process.env.PORT || 9000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

var server = app.listen(server_port, server_host, function () {
    console.log(`App listening at port ${server_port}`)
});
readAllBlock();
module.exports = server;