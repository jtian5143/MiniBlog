//import dependencies
var express = require('express');

var router = express.Router();

var Post = require('../model/posts');

/**Post*/
router.get('/post', function(req, res, next){
    res.render('post', {title: 'Post'})
});

router.post('/post', function(req, res) {

});
/**End of post*/
  
module.exports = router;