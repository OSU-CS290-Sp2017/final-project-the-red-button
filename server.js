var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var fs = require('fs');
var url = require('url');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var buttonData = require('./buttonData');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

////////Send to Client//////
app.get('/', function(req, res, next){
  var data = JSON.parse(fs.readFileSync('buttonData.json'));

  /*if (data == ''){ //Always start with 'easy' if json is null
    data.push('easy');
    fs.writeFileSync('buttonData.json', JSON.stringify(data, null, 2));
    var textData = {
      wordData: "easy"
    };
  } else {*/

    var textData = {
        wordData: data
    };
  //}
  res.render('index', textData);
});

///////From Client//////
app.post('/', function(req, res, next){
  var data = JSON.parse(fs.readFileSync('buttonData.json'));
  var button = data[0].button;
  var right = data[1].right;
  var left = data[2].left;

  //Fail-test function
  function fail(array, sendData){
    var fail = false;
    for (var i = 0; i < array.length; i++) {
      if( sendData == array[i] || sendData == ''){
        var fail = true;
      }
    }
    if (fail == false){
      array.push(sendData);
    }
  }
  fail(button, req.body.button);
  fail(right, req.body.right);
  fail(left, req.body.left);

  fs.writeFileSync('buttonData.json', JSON.stringify(data, null, 2));
});

//app.get('*', function)req, res, next){}

app.listen(port, function(){
  console.log("server on port", port);
});
