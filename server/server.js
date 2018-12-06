//import necessary libraries and modules
var express = require('express');
var validator = require('validator'); 
var nodemailer = require('nodemailer'); 
const bodyParser = require('body-parser');

const app = express();
//create port
var port = 8081;
var mailOptions;
var smtpTransport = nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user: "hpate45@gmail.com",
        pass: "Harsh1998!"
    }
});
//import schemas
var Game = require("./models/gameSchema");
var User = require("./models/userSchema");
var Policy = require("./models/policySchema");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//import mongoose and connect to IMLab cloud server
var mongoose = require('mongoose');
mongoose.connect('mongodb://harshbuddy:harshbuddy123@ds123834.mlab.com:23834/se3316-hpate45-lab5', { useNewUrlParser: true });
//check for successful connection or throw an error
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB connection alive");
});
//define express router
var router = express.Router();
//base function for all routes
router.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    console.log('Something is happening');
    next();
});

//route to log user in
router.route('/login')
    .get(function(req,res){
        res.send("Hello World");
    });

//route to load dashboard components
router.route('/dashboard')
    .get(function(req,res){
        //finds all games in database and sends it
        Game.find({},function(err,games){
            if(err){
                res.send(err);
            } else {
                res.send(games);
            }
        })
    });
    
//route to load policy data
router.route('/policy')
    .get(function(req,res){
        //finds policy in database and sends it
        Policy.find({},function(err,policy){
            if(err){
                res.send(err);
            } else {
                res.send(policy);
            }
        })
    });

//route to find specific item for dashboard
router.route('/dashboard/:id')
    .get(function(req,res){
        //finds a game based on id and sends it
        Game.find({_id: req.params.id},function(err,game){
            if (err){
                res.send(err);
            } else {
                res.send(game);
            }
        })
    })
//validates user on log in with email and password
router.route('/validateUser/:email/:password')
    .get(function(req,res){
        //finds user based on email and sends it
        User.find({email: req.params.email},function(err,user){
            if (err){
                res.send(err);
            } else {
                res.send(user);
            }
        })
    })
    
//route to write a review for a game
router.route('/newReview')
    .post(function(req,res){
        //finds games based on title        
        Game.find({'title':req.body.title},function(err,game){
            if (err){
                res.send(err);
            } else {
                //create a new array with data
                var myArray = [{
                    'reviewWriter': req.body.reviewsWriter,
                    'reviewName': req.body.reviewsTitle,
                    'reviewComments': req.body.reviewsText,
                    'rating': req.body.reviewsRating
                }]
                //push data from array into game objects reviews column
                game[0].reviewRating.push(myArray,function(err){
                    if (err){
                        return res.send(err);
                    } else {
                        res.send({message:"review added"});
                    }
                })
            }
        })
        
    })
// route to add game into database
router.route('/addGame')
    .post((req,res)=>{
        //create a new game with required fields
        var newGame = Game();
        newGame.title = req.body.title;
        newGame.stock = req.body.stockNum;
        newGame.description = req.body.gamedesc;
        newGame.price = req.body.gamePrice;
        newGame.imgSrc = req.body.imgLink;
        //look for game based on title and if it doesn't exist then create it
        Game.find({'title':newGame.title},function(err,foundGame){
            if (foundGame[0] == null){
                newGame.save(function(err){
                    if(err){
                        return res.send(err);
                    } else {
                        res.send({message:"Game Added"});
                    }
                });
                
            } else {
                res.send({message:"Game already exists"});
            }
            if (err) {
                res.send(err);
            }
        });
    })

//route to delete game from database
router.route('/deleteGame')
    .post((req, res) => {
        //remove game from database based on title
        Game.remove({'title': req.body.title}, (err, col)=> {
            if (err) {
                return res.send(err);
            }
            return res.send({message : "Deleted Game"}); 
        })
    })

//route to change game components
router.route('/modifyGame')
    .post((req, res) => {
        //find game based on title
        Game.find({'title': req.body.title}, (err, game)=> {
            if (err) {
                return res.send(err);
            }
            //change values of the game based on request body
            game[0].description = req.body.desc;
            game[0].stock = req.body.stock;
            game[0].price = req.body.price;
            game[0].save(function(err){
                if(err){
                    return res.send(err);
                } else {
                    res.send({message:"Modify Success"});
                }
            })
        })
    })
    
//route to modify security policy
router.route('/modifySecurity')
    .post((req, res) => {
        //find policies
        Policy.find({}, (err, policy)=> {
            if (err) {
                return res.send(err);
            }
            //change value
            policy[0].security = req.body.newSecurityValue;
            //save new value
            policy[0].save(function(err){
                if(err){
                    return res.send(err);
                } else {
                    res.send({message:"Modify Success"});
                }
            })
        })
    })
    
//route to modify privacy policy
router.route('/modifyPrivacy')
    .post((req, res) => {
        //find policies
        Policy.find({}, (err, policy)=> {
            if (err) {
                return res.send(err);
            }
            //change value
            policy[0].privacy = req.body.newPrivacyValue;
            //save new value
            policy[0].save(function(err){
                if(err){
                    return res.send(err);
                } else {
                    res.send({message:"Modify Success"});
                }
            })
        })
    })

//route to modify DMCA policy
router.route('/modifyDMCA')
    .post((req, res) => {
        //find policy
        Policy.find({}, (err, policy)=> {
            if (err) {
                return res.send(err);
            }
            //change value
            policy[0].dmca = req.body.newDMCA;
            //set new value        
            policy[0].save(function(err){
                if(err){
                    return res.send(err);
                } else {
                    res.send({message:"Modify Success"});
                }
            })
        })
    })

//route to create a new user
router.route('/newUser/:email/:password/:first/:last')
    .post(function(req,res){
        //create a new user and fill out their fields
        var user = new User();
        user.firstName = req.params.first;
        user.lastName = req.params.last;
        user.email = req.params.email;
        user.password = req.params.password;
        //validate user's email 
        if(!validator.isEmail(req.params.email) || req.params.email == ""){
            return res.send({message:"Invalid Email"});
        } else if (req.params.password == ""){
            return res.send({message:"Please enter a password"});
        } else {
            //find users with same emails to check if user exists
            User.find({'email':user.email},function(err,foundUser){
                if (foundUser[0] == null){
                    //if user doesn't then create account
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
        //send a confirmation email not working
        // mailOptions={
        //     to : req.params.email,
        //     subject: "Confirm email for TBV Games",
        //     html : "Please enter this code to verify email. 1953"
        // };
        // smtpTransport.sendMail(mailOptions,function(err,res){
        //     if (err){
        //         console.log(err);
        //     } else {
        //         console.log(res);
        //     }
        // })
        
    })
    

app.use('/api', router);

//start server
app.listen(port, function(){
    console.log("app listening on port "+port+"...");
});