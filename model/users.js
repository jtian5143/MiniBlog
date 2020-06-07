var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;

mongoose.connect(config.mongodb);

var UserSchema = new Schema({
    username:String,
    password:String,
});


var Users = mongoose.model('User',UserSchema);
module.exports = Users;