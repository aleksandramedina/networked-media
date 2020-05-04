var http = require('http');

var bcrypt = require('bcrypt-nodejs');

var session = require ('express-session');
var nedbstore = require('nedb-session-store')(session);



var fs = require('fs');

var multer  = require('multer');
// bit of a security risk
var upload = multer({ dest: 'public/uploads/' });


var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload: true});

var regDB = new Datastore({filename: "userreg.db", autoload: true});


var express = require('express');
var app = express();


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(
  session(
    {
      secret: 'secret',
      cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000
      },
      store: new nedbstore({
        filename: 'sessions.db'
      })
    }
  )
);

var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:true});

var urlencodedParser = bodyParser.urlencoded({ extended: true });
 app.use(urlencodedParser); 



        //registration feature

        app.post('/register', function (req,res){
            //sending in username and password
            //req.body.Username
            //req.body.Password
            var passwordHash = generateHash(req.body.password);
            // res.send("you entered: " + req.body.password + " we are going to store: " + passwordHash);
            var registration = {
              "username" : req.body.username,
              "password" : passwordHash
            };

            regDB.insert(registration);
            console.log("inserted: " + registration);

            res.redirect("/login.html");

        });

        function generateHash(pass){
          console.log("generate hash " + pass);
          return bcrypt.hashSync(pass);

        }

        function compareHash(password, hash){

          console.log("compare hash: " + password +"    " + hash);

          return bcrypt.compareSync(password, hash);
        }


          //login feature
          app.post('/login', function (req, res){
            regDB.findOne({"username": req.body.username},

          function(err,doc){
            if (err){
              res.send ("Invalid Try Again");
            }
            if (doc != null){
              console.log("this is doc: ", doc);
              if (compareHash (req.body.password, doc.password)){

                req.session.username = doc.username;

                req.session.lastlogin = Date.now();

                res.redirect("/mainpage.html");
              }else {
                res.send("Invalid Try Again");
              }
            }else {
              res.send ("Invalid Try Again");
            }

          });
          });

// not sure - tried to create a
//route that lets the user edit the unfinished activities


  app.post('/submit', upload.single('thefile'), function (req, res){


    console.log("file uploaded:");
    console.log(req.file);


    var data = {
      description: req.body.description,
      file: req.file.filename + ".jpg",
      timestamp: Date.now(),

    };

    console.log(data);
    console.log("this is the filename: " + req.file.filename);
    console.log("this is file: " + file);


    db.insert(data, function (err, newDocs) {



    });

  });

  //a route that leads to individual posts

  app.get("/individual", function (req,res) {
    var id = req.query.id;
    db.find({_id:id}, function(err,docs){
      console.log(docs);

      var datatopass = {data: docs[0]};
        if (docs[0].status==false){
          res.render("notfinished.ejs", datatopass);
        }else if (docs[0].status==true){
          res.render("finished.ejs", datatopass);
        };

      // res.send(docs);
    });
  });

  //a route that categrorizes between finished and unfinished activiities


              // the route that leads to the page of the info
              //saved to data base after accepting the challenge

              app.post('/completeactivity', upload.single('thefile'), function(req,res){

                console.log(req.body);

                console.log("this is the filename: " + req.file.filename);
                console.log("this is file: " + req.file);

                // db.find({}).exec(function(err,docs){
                //
                //         for (var i = 0; i < docs.length; i++) {
                //           //docs[i].timestamp
                //
                //           var humanDate = new Date(docs[i].timestamp);
                //           docs[i].timestamp = humanDate.toString();
                //           console.log("This is humandate: " + humanDate + " and this is timestamp: " + docs[0].timestamp);
                //           console.log("and this is req.body.timestamp" + req.body.timestamp);
                //         }
                //
                //
                // });



                db.update({ _id: req.body.activityid }, { $set: { status: true, description: req.body.textbox, filename: req.file.filename } }, {  }, function (err, numReplaced) {
                    res.redirect("/previous");
                  });


              });


// the route that saves the activity given by the IPA

app.post('/newactivity', function (req, res) {

  console.log("req.query = ", req.query);

        var data = {
          type: req.query.type,
          activity: req.query.activity,
          participants: req.query.participants,
          timestamp: Date.now(),
          status: false,
        };


        db.insert(data, function (err, newDocs) {

          console.log("err: " + err);
          console.log("newDocs: ", newDocs);
        });

  res.send({url: '/previous'})

});

//the route to see all the posts, both finished and unfinished

app.get('/previous', function(req,res){

        db.find({}, function (err,docs){

          res.render("previous.ejs", {data: docs});

        })

});




app.listen(80, function () {
  console.log('Example app listening on port 80!')
});
