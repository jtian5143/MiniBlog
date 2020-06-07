//import dependencies
var express = require('express');

var router = express.Router();
var crypto = require('crypto');

var User = require('../model/users');

/*Homepage*/
router.get('/',function(req,res,next){
  res.render('index',{
       title:'Homepage',
  });
});

/*Registration*/
//Go to registration page
router.get('/reg', function(req, res, next){
  console.log("Registration page");
  res.render('reg', {title: 'Registration'})
});

//Registration process
router.post('/reg', function(req, res) {
  var userData = new User({
    username:req.body.username,
    password:req.body.password
  });

  userData.password = crypto.createHash('md5').update(password).digest("hex");

  if(req.body['password'] != req.body['repeat-password']) {
    console.log("Password does not match");
    return res.redirect('/reg');
  }

  User.findOne({
    'username':userData.username
  }, function(err, data) {
    if(err) {
      return res.redirect('/reg');
    }
    if(data != null) {
      //User already exists
      console.log("User already exist");
      return res.send('User already exist');
    } else {
      //insert new user to db
      userData.save(function(err, data) {
        if(err) {
          console.log("Error when inserting");
          return res.redirect('/reg');
        } else {
          console.log("Succeed");
          res.redirect('/login');
        }
      })
    }
  })
});
/*End of registration part */

/**Log in*/
//Go to log in page
router.get('/login', function(req, res, next){
  res.render('login', {title: 'Login'})
});

//Login process
router.post('/login', function(req, res, next) {
  var password = req.body.password;

  User.findOne({'username': req.body.username
      },function(err, user) {
          if(err) {
            res.redirect('/login');
          } 
          if(!user) {
            res.send('Log info wrong');
          } 
          if(user.password != password) {
            return res.send('Wrong password');
          }

          req.session.user = user;
          res.redirect('/');
        }
  );
});
/** end of Log in*/

module.exports = router;
