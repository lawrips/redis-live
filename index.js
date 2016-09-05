'use strict';

var express = require('express')
var exphbs  = require('express-handlebars');
var app = express()
var bodyParser = require('body-parser')
var Redis = require('ioredis')
var nconf = require('nconf');
nconf.env().file({file: './config/config.json'})

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); 
app.use(express.static('lib/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
console.log(nconf.get('cluster'))

app.listen(9999);

let cluster = new Redis.Cluster(nconf.get('cluster'), 
{
    redisOptions: nconf.get('options')
});

app.get('/', (req, res) => {
    let hosts = nconf.get('cluster').map((i) => i.host + ':' + i.port);
    return res.render('index', {hosts: JSON.stringify(hosts)});
});

app.post('/info', (req, res) => {
    let redisOptions = nconf.get('options');
    redisOptions.host = req.body.host.split(':')[0];
    redisOptions.port = req.body.host.split(':').length > 1 ? req.body.host.split(':')[1] : 6379;
    let redis = new Redis(redisOptions);

    redis.info((err, result) => {
        return res.send(result);
    }); 
});

app.post('/command', (req, res) => {
    var commands = req.body.command.split(' ');

    cluster.pipeline([
        commands        
    ]).exec((err, result)  => { 
        console.log('got result: ' + result);
        if (err) return res.send(err);
        if (result[0].length <= 1) return res.send('bad');
        return res.send(result[0][1]);
    });
});


