var express = require('express');
var validator = require('validator'); 
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
    
router.route('/newReview/:gameName')
    .put(function(req,res){
        
        var game = new Game();
        game.title = req.params.gameName;
        
        Game.findOne({'title':game.title},function(err,game){
            if (err){
                res.send(err);
            } else {
                game.reviewRating.push({
                    'reviewWriter':req.body.reviewsWriter,
                    'reviewName':req.body.reviewsTitle,
                    'reviewComments':req.body.reviewsText,
                    'rating':req.body.reviewsRating
                },function(err){
                    if(err){
                        res.send("error: "+err);
                    } else {
                        res.send("added review");
                    }
                })
            }
        })
        
    })
    
router.route('/newUser/:email/:password/:first/:last')
    .post(function(req,res){
        var user = new User();
        user.firstName = req.params.first;
        user.lastName = req.params.last;
        user.email = req.params.email;
        user.password = req.params.password;
        
        if(!validator.isEmail(req.params.email) || req.params.email == ""){
            return res.send({message:"Invalid Email"});
        } else if (req.params.password == ""){
            return res.send({message:"Please enter a password"});
        } else {
            User.find({'email':user.email},function(err,foundUser){
                if (foundUser[0] == null){
                    
                    user.save(function(err){
                        if (err) {
                            return res.send(err);
                        } else {
                            res.send({message:"Account Created"});
                        }
                    });
                    
                } else {
                    res.send({message:"Email already in use"});
                }
                if (err) {
                    res.send(err);
                }
            });
        }
        
        
    })
    

app.use('/api', router);


app.listen(port, function(){
    console.log("app listening on port "+port+"...");
});