var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
    userId: {type: String, required: true},
    title: String,
    description: String,
    updateAt: Date
});

module.exports = mongoose.model('Todo', Todo);
