var express = require('express');
var mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
var port = 8081;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening');
    next();
});

// GET request to /api returns { message: 'Hello World' }
// In my C9 account the request must be sent to https://node-angular-lgobinath.c9users.io:8081/api
router.get('/', function(req, res) {
    res.json({ message: 'Hello World' });
});


router.route('/login')
    .get(function(req,res){
        res.send("Hello World");
    });





app.use('/api', router);


app.listen(port, function(){
    console.log("app listening on port "+port+"...");
});