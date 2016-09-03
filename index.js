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
app.use(express.static('public'));
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
    return res.render('index');
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

/*    if (commands[0] == 'get') {
        cluster.get(commands.slice(1).join(' '), (err, result) => {
            console.log('got result: ' + result);
            return res.send(result);
        });
    }

    else if (commands[0] == 'set') {
        console.log(commands.slice(1).join(' '))
        cluster.set(commands[1], commands[2]);
        return res.send('ok');
    }*/
});


