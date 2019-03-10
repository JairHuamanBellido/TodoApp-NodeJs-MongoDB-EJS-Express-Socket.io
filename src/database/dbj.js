const mongoose = require('mongoose');

const uri = '<YOUR DATABASE URL>'


const connect = mongoose.connect(uri, { useNewUrlParser: true })
    .then(db => console.log("db connected"))
    .catch(err => console.log(err));

module.exports = {mongoose,connect};
