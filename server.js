var express = require("express");
var path = require("path");
var session = require('express-session');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// create schema here
mongoose.connect('mongodb://localhost/dojo');
// var Schema = mongoose.Schema; 
var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String
})
var Quote = mongoose.model('Quote', QuoteSchema); 
app.use(bodyParser.urlencoded({extended: true}));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res) {
    res.render("index");
})
// post route for adding a user
app.post('/quotes', function(req, res) {           
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    quote.save(function(err){        
    // if there is an error console.log that something went wrong!
    if (err) {
        console.log('something went wrong');
    } 
    else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a user!');
        // Then redirect to the root route
        res.redirect('/main');
        }
    })
})
app.get('/main', function (req, res) {    
    Quote.find({}, function (err, quotes) {        
        if (err) {
            console.log(err);
        }        
        res.render('main', {quotes: quotes});
    })
})
// tell the express app to listen on port 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});