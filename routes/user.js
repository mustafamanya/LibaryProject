const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');


// user model
const User =require('../models/Users');

// login page
router.get('/login', (req,res)=> res.render('login'));

// Regeister page
router.get('/register', (req,res)=> res.render('register'));


//Register Handle
router.post('/register',(req,res)=>{
const{name,email,password,password2}=req.body;
let errors=[];
//check required feilds 
if(!name ||!email || !password || !password2){
    errors.push({msg:'please fill in all feilds'} );
}

//check if passwords match
if(password !=password2){
    errors.push({msg:'Password do not match '});
}

//check pass len

if(password.len <6){
errors.push({msg:'Password should be atleast 6 characters '});
}

if(errors.length>0){
   res.render('register',{
       errors,
       name,
       email,
       password,
       password2
   });
}else{
    //validation passed
    User.findOne({email:email})
    .then(user=>{
        if(user){
            errors.push({msg:'Email already registred '});
            // user exits
            res.render('register',{
                errors,
                name,
                email,
                password,
                password2
            });

        }else{
            const newUser= new User({
                name, 
                email,
                password
            });
            console.log(newUser)
            res.send('hello');
        }
    });
    

}

});

module.exports=router;
