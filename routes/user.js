// this is where we check for all details in registration page. Also encypts password and adds to database 

const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const passport =require('passport');


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
            //hash passwords 
            bcrypt.genSalt(10,(err,salt)=>
             bcrypt.hash(newUser.password,salt, (err, hash)=>{
                if(err) throw err;
                // set password to hash
                newUser.password=hash;
                //save user
                newUser.save()
                .then(user =>{
                    req.flash('suscess_msg', 'You are now registred')
                    res.redirect('/users/login');
                })
                .catch(err=>console.log(err));

            }))
        }
    });
    

}

});

//login handle

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });


 // Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
  
  
module.exports=router;


