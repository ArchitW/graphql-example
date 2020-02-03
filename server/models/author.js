const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name:String,
    age:Number
});

module.export =mongoose.model('Author', authorSchema);