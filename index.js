const express = require('express');
const Users = require('./route/userRoute');
const app = express();
app.use(express.json())
const db = require('./models');


//Middleware
app.use('/user', Users)


db.sequelize.sync().then(() =>{
  
})

app.listen(3000, ()=>{
    console.log("running on port 3000")
})



