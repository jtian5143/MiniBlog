var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;

mongoose.connect(config.mongodb);

var PostSchema = new Schema({
    title:String,
    author: String,
    article:String,
    time: String
});


var Posts = mongoose.model('Post',PostSchema);
module.exports = Posts;