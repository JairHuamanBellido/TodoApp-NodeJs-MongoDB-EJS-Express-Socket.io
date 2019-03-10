const express = require('express');
const app = express();
const path =  require('path')
const router =  require('./src/router/routers');
const mongoose = require('./src/database/dbj');


app.use(express.urlencoded({extended:false}));

app.use('/src',express.static('src'));
app.set('views', path.join(__dirname+'/src/views'));
app.set('view engine','ejs');

app.use('/', router);

mongoose.connect;


app.listen(3000, ()=>{
    console.log('Listen on port localhost:3000');
})