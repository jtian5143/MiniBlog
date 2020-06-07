var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;

mongoose.connect(config.mongodb);


var PostSchema = new Schema({
    title:String,
    article:String,
    author: String,
    publishTime: String
});


var Post = mongoose.model('Post',PostSchema);
module.exports = Post;