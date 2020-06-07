//import dependencies
var express = require('express');
var router = express.Router();

var User = require('../model/users');
var Post = require('../model/posts');

var moment = require('moment');//Time module

/*Homepage*/
router.get('/',function(req,res,next){
  Post.find({}, function(err, data) {
    if(err) {
      req.flash('error');
      return res.redirect('/');
    }
    res.render('index', {
      title:'Homepage',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString(),
      posts:data,
      time: moment(new Date()).format('YYYY-MM-DD')
    })
  }
  );
});


/*Registration*/
//Go to registration page
router.get('/reg', function(req, res, next){
  console.log("Registration page");
  res.render('reg', {
    title: 'Register',
    user: req.session.user, 
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

//Registration process
router.post('/reg', function(req, res) {
  var userData = new User({
    username:req.body.username,
    password:req.body.password
  });

  if(req.body['password'] != req.body['repeat-password']) {
    console.log("Password does not match");
    req.flash('Password does not match');
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
          req.session.user = userData;
          req.flash("Registraion succussful!")
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
  res.render('login', {
    title: 'Login',
    user: req.session.user, 
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

//Login process
router.post('/login', function(req, res) {
  var password = req.body.password;

  User.findOne({'username': req.body.username
      },function(err, user) {
          if(err) {
            res.redirect('/login');
          } 
          if(!user) {
            req.flash('User does not exist!');
            return res.redirect('/login');
          } 
          if(user.password != password) {
            return res.redirect('/login');
          }

          req.session.user = user;
          req.flash('Log in successful!');
          res.redirect('/');
        }
  );
});
/** end of Log in*/

router.get('/logout', function(req, res){
   req.session.user = null;
   res.render('logout', {title: "log out"});
});

router.get('/delete',function(req,res){
  var id = req.query.id;
  console.log(id);
  if(id && id!=''){
      Post.findByIdAndRemove(id,function(err){
          if(err){
              console.log(err);
              req.flash("success");
              return req.redirect('/')
          }
          req.flash("success");
          res.redirect('/');
      })
  }
});

module.exports = router;
