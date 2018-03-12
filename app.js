var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var slashes = require('slashes');

var client = mysql.createConnection({
  user:'forelise25',
  password:'2Vqcqe5P9JDkmyMa',
  database:'forelise25'
});

var app = express();
app.use(bodyParser.urlencoded({
  extended:false
}));

app.listen(8080, function(){
  console.log('server running at person.emirim.kr:8080');
});

app.get('/', function(request, response){
  fs.readFile('index.html', 'utf-8', function(error, data){
    client.query('select * from guest_board order by gnum desc', function(error, gresults){
      client.query('select * from question',function(error, qresults){
        response.send(ejs.render(data,{
          guest_board:gresults,
          question:qresults
        }));
      });
    });
  });
});
app.get('/delete/:for_num', function(request, response){
  client.query('delete from guest_board where id=?',[
    request.params.for_num
  ], function(){
    response.redirect('/');
  });
});
app.get('/update/:for_num', function(request, response){
  fs.readFile('index.html', 'utf-8', function(error, data){
    client.query('select * from guest_board order by gnum desc', function(error, gresults){
      client.query('select * from question',function(error, qresults){
        response.send(ejs.render(data,{
          guest_board:gresults,
          question:qresults
        }));
      });
    });
  });
});
