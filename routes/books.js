const express=require('express');
const router = express.Router();

//book model
const Books =require('../models/Books');

//books display

router.get('/displaybook', (req,res)=> res.render('displaybook'));



router.get('/book', (req,res)=>res.render('book'));

router.post('/book',(req,res)=>{

    
    const{BookTitle,ISBN,PublishYear,CoverPrice, CheckIn,CheckOut, CheckHistory}=req.body;

    //res.send('hello');

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
    req.flash('success_msg', 'Book now added');
    res.redirect('/users/displaybook')
    
})
.catch(err=>console.log(err));
    
});


module.exports=router;



