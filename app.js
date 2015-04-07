
/**
 * Module dependencies.
 */
 
var express = require('express')
  , routes = require('./routes');
var http = require('http');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


app.post('/display', display_result);


function display_result(req, res){
  var query = req.body.search;
  console.log(query);
  var currentTemp = fetch_temp(query, res);
  
}

function fetch_temp (query, response){
  var optionspost = {
    host: 'api.openweathermap.org',
    port : 80,
    path : '/data/2.5/weather?q='+query+',in',
    method : 'POST'
  }

  var currentTemp;
  var reqGet = http.request(optionspost, function(res) {
    res.on('data', function(d) {
        console.info('GET result:\n');
        var apiResponse = JSON.parse(d);
        console.info('\n\nCall completed');
        var currentTemp = parseInt(apiResponse["main"].temp) - 273;
        console.log("Current Temp is ====>" + currentTemp);
        response.render('display',{ currentTemp: currentTemp, city: query });
      });
  });
 
  reqGet.end();
  reqGet.on('error', function(e) {
    console.error(e);
  });

  

  return currentTemp;
}
