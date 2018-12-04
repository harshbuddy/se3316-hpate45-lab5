var express = require('express');
const bodyParser = require('body-parser');

const app = express();

var port = 8081;

var Game = require("./models/gameSchema");
var User = require("./models/userSchema");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://harshbuddy:harshbuddy123@ds123834.mlab.com:23834/se3316-hpate45-lab5', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

var router = express.Router();

router.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
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


router.route('/dashboard')
    .get(function(req,res){
        
        Game.find({},function(err,games){
            if(err){
                res.send(err);
            } else {
                res.send(games);
            }
        })
    });
    
router.route('/dashboard/:id')
    .get(function(req,res){
        Game.find({_id: req.params.id},function(err,game){
            if (err){
                res.send(err);
            } else {
                res.send(game);
            }
        })
    })

router.route('/validateUser/:email/:password')
    .get(function(req,res){
        User.find({email: req.params.email},function(err,user){
            if (err){
                res.send(err);
            } else {
                res.send(user);
            }
        })
    })
    
router.route('/newUser/:email/:password/:first/:last')
    .post(function(req,res){
        
    })

app.use('/api', router);


app.listen(port, function(){
    console.log("app listening on port "+port+"...");
});