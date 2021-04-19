const express= require('express');

const app= express();

//routes 
app.use('/', require('./routes/index'));

app.use('/users', require('./routes/user'));


const PORT = process.env.PORT||5000;

app.listen(PORT, console.log('Sever started on port: ', PORT));
