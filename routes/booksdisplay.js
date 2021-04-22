const express=require('express');
const router = express.Router();

//book model
const Books =require('../models/Books');
var book= Books.find({});




router.get('/', function(req,res,next){
book.exec(function(err,data){

if(err)throw err;
res.render('index',{title:'books'}, book.title)

});


});






