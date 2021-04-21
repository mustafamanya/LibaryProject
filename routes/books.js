const express=require('express');
const router = require('.');

//book model
const Books =require('../models/Books');

console.log(Books.bookname);
console.log('hello');


router.get('/book', (req,res)=>res.render('book'));

router.post('/book',(req,res)=>{

    
    const{BookTitle,ISBN,PublishYear,CoverPrice, CheckIn,CheckOut, CheckHistory}=req.body;

    res.send('hello');

const NewBook=new Books({
    BookTitle,
    ISBN,
    PublishYear,
    CoverPrice,
    CheckIn,
    CheckOut,
    CheckHistory
});
console.log(NewBook);
NewBook.save()
.then(Books=>{
    console.log("new book added ")
})
.catch(err=>console.log(err));
    
});


module.exports=router;



