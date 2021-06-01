var express = require('express')
var app = express()

// app.get('/', function (req, res) {
//   res.send('hello world')
// })

// app.all('/secret', function (req, res, next) {
//   console.log('Accessing the secret section ...')
//   next() // pass control to the next handler
// })

// app.get('/hello', function(req,res) {
//   res.send("You just called the post method at '/hello! \n")
// })

// app.all('/test', function(req, res){
//   res.send("HTTP method doesn't have any effect on this route!");
// });

// var things = require('./things.js');

// app.use('/things', things);


// app.get('/:id', function(req,res) {
//   res.send('The id you specified is ' + req.params.id);
// })

// app.get('/things/:id([0-9]{5})', function(req,res) {
//   res.send('id: ' + req.params.id);
// })

// app.get('*', function(req,res) {
//   res.send('Sorry, this is an invalid URL.')
// })

// //MiddleWare
// //Simple request time logger
// app.use('/things', function (req, res, next) {
//   console.log("A new request recieived at " + Date.now());
//   next();
// })

// app.get('/things', function(req,res) {
//   res.send('Things');
// });

//Order of middleware
app.use(function(req, res, next) {
  console.log("Start");
  next();
});

app.get('/', function(req, res, next) {
  res.send("Middle");
  next();
})

app.use('/', function(req, res) {
  console.log('End');
});
app.listen(3000);