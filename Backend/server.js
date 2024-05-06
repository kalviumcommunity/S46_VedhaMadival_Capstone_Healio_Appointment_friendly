const express = require('express')
const app = express();
require('dotenv').config();


app.get('/' , (req , res)=>{
    res.json({message:"Capstone Get request successful"})
})

app.listen(process.env.PORT , ()=>{
    console.log("Server Listening to PORT" , process.env.PORT)
})