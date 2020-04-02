var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload: true});


var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

app.get('/', function (req, res) {
  //res.send('Hello World!')
  //res.render("form.ejs",{});
  res.redirect("/display");
});

var alldatas = [];
app.post('/submit', function (req, res) {

  var data = {
    person: req.body.person,
    mood: req.body.mood,
    timestamp: Date.now()
  };

  console.log("this is mood" + data.mood);

  //alldatas.push(data);
  db.insert(data, function (err, newDocs) {
	   console.log("err: " + err);
	    console.log("newDocs: " + newDocs);
  });

  //res.render('timeline.ejs', {thedata: alldatas});
  //res.send("Thanks");
  res.redirect("/display");
});

app.get("/individual", function(req, res) {
  var id = req.query.id;
  db.find({_id: id}, function(err, docs) {
    console.log(docs);
    // Should go to an EJS
    res.send(docs);
  });
});

app.get('/display', function(req, res) {

  var sort = req.query.sort;
  if (sort == "") {
    sort = "timestamp";
  }

  if (sort == "timestamp") {
    sort = {timestamp: 1};
  } else if (sort == "person") {
    sort = {person: 1};
  } else {
    sort = {mood: 1};
  }

  db.find({}).sort(sort).exec(function (err, docs) {
    //db.find({}).sort({ timestamp: 1 }).exec(function (err, docs) {
    //db.find({}, function(err, docs) {
      console.log(docs);
      //res.send(docs);

      // for (var i = 0; i < docs.length; i++) {
      //   //docs[i].timestamp
      //   var humanDate = new Date(docs[i].timestamp);
      //   docs[i].timestamp = humanDate.toString();
      // }


      var datatopass = {data:docs};
      res.render("display.ejs",datatopass);
    });
});

app.get('/data', function(req,res) {
    db.find({}).sort({ timestamp: 1 }).exec(function (err, docs) {
      console.log(docs);
      res.send({thedata: docs});
    });
});

app.listen(80, function () {
  console.log('Example app listening on port 80!')
});
