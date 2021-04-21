const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose= require('mongoose');
const flash =require('connect-flash');
const session= require('express-session');
const passport=require('passport');
const app= express();
const mysql= require('mysql');


//create connection with sql


// const db= mysql.createConnection({
//   host     : 'localhost',
//   user     : 'me',
//   password : '',
//   database : 'my_db'
// });

// //connect to sql
// db.connect(function(error){
// //call back

// if(!!error){
//   console.log('Error')
// }else{
//   console.log('Connected');
// }

// });



//passport config
 require('./config/passport')(passport);


//DB config
const db =require('./config/keys').MongoURI;
const { connect } = require('./routes/index.js');

//Connect to Mongo   

mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser 
app.use(express.urlencoded({ extended: true }));

//Express session 
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  //passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  //Connect flash

  app.use(flash());

  //Global Vars
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//routes 
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/user.js'));
app.use('/users', require('./routes/books.js'));




const PORT = process.env.PORT||5000;


app.listen(PORT, console.log('Sever started on port: ', PORT));




