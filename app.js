const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app= express();

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');



//routes 
app.use('/', require('./routes/index.js'));

app.use('/users', require('./routes/user.js'));


const PORT = process.env.PORT||5000;

app.listen(PORT, console.log('Sever started on port: ', PORT));
