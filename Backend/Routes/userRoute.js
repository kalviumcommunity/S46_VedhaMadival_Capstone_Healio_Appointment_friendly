const express = require("express");
const router = express.Router();


router.get('/doctors' , (req , res)=>{
    res.json({message:"Capstone Get all doctors request successful"})
})

router.get('/doctors/:id' , (req , res)=>{
    res.json({message:"Capstone Get doctor by id request successful"})
})

router.get('/patients', (req,res) =>{
    res.json({message:"Capstone Get all patients request successful"})
})

router.get('/patients/:id' , (req,res) =>{
    res.json({message:"Capstone Get patient by id request successful"})
})









module.exports = router;