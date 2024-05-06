const express = require("express");
const router = express.Router();


//GET API USED
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

//POST API USED
router.post('/login' , (req , res)=>{
    res.json({message:"Created a new user"})
})

router.post('/new-doctor' , (req , res)=>{
    res.json({message:"Created a new doctor"})
})

router.post('/new-patient' , (req , res)=>{
    res.json({message:"Created a new patient"})
})


//PUT API USED
router.put('/doctor-edit' , (req , res)=>{
    res.json({message:"Edited doctor details"})
})

router.put('/patient-edit' , (req , res)=>{
    res.json({message:"Edited patient details"})
})


module.exports = router;