//import dependencies
var express = require('express');

var router = express.Router();

var Post = require('../model/posts');


var moment = require('moment');//Time module
var formidable = require('formidable');

/**Post*/
router.get('/', function(req, res, next){
    res.render('post', {
        title: 'Post',
        user:req.session.user
    })
});

router.post('/', function(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err,fields) {
        if(err) {
            req.flash('error');
            return;
        }

        var title = fields.title;
        var article = fields.article;
        var author = req.session.user.username

        var post = new Post({
            author: author,
            title: title,
            article: article,
            time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString()
        });
    
        post.save(function(err) {
            if(err) {
                req.flash('error');
                return res.redirect('/');
            }
    
            req.flash('success');
            res.redirect('/');
        })
    })
});
/**End of post*/


module.exports = router;