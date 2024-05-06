const express = require('express')
const app = express();
require('dotenv').config();
const userRoute = require("./Routes/userRoute");

app.use("/", userRoute);

app.get('/' , (req , res)=>{
    res.json({message:"Capstone Get request successful"})
})

app.listen(process.env.PORT , ()=>{
    console.log("Server Listening to PORT" , process.env.PORT)
})