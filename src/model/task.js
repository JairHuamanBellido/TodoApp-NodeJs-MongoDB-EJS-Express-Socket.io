const mongoose =  require('../database/dbj')
const Schema =  mongoose.mongoose.Schema;
const task = new Schema({
    task:String,
    complete:Boolean
})


module.exports =  mongoose.mongoose.model('tasks',task);