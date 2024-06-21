const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const Patient = require("../Models/PatientModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middlewares/authMiddleware")

//Write Performed: Create a new user
router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res
        .status(400)
        .send({ message: "User already exists", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log(newUser);
    res.status(200).send({
      message: "User Created Succesfully",
      success: true,
      data: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating user", success: false });
  }
});

//Read Performed: Reads and authenticates a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).send({
        message: "User Verified & Login Successful",
        success: true,
        data: token,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

// Getting a user data by id
router.get("/user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        message: "user found",
        success: true,
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
          isdoctor: user.isdoctor,
          isadmin: user.isadmin,
          seenNotifications: user.seenNotifications,
          unseenNotifications: user.unseenNotifications,
        },
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting in the backend", success: false, error });
  }
});


// Read Performed: Getting all users
router.get("/user-info-all", async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send({
      message: "All users retrieved successfully",
      success: true,
      data: users.map((user) => ({
        name: user.name,
        email: user.email,
        isdoctor: user.isdoctor || false,
        isadmin: user.isadmin || false,
        seenNotifications: user.seenNotifications || [],
        unseenNotifications: user.unseenNotifications || [],
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});

//Storing Patient Personal Data
router.post("/patient-details", authMiddleware, async (req, res) => {
  try {
    const patientExists = await Patient.findOne({ userId: req.body.userId });
    if (patientExists) {
      return res
        .status(200)
        .send({ message: "Patient already exists", success: false });
    }
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(200).send({ message: "Patient details saved", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error submitting details", success: false });
  }
});

//Getting Patient Personal Data by id
router.get("/get-patient-details", authMiddleware,async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.body.userId });
    
    if (!patient) {
      return res.status(400).send({ message: "Patient not found" });
    }
    
    return res
    .status(200)
    .send({ message: "Patient Details Fetched", success: true, data: patient });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting in the backend", success: false, error });
    }
  }
);















//GET API USED
router.get("/doctors", (req, res) => {
  res.json({ message: "Capstone Get all doctors request successful" });
});

router.get("/doctors/:id", (req, res) => {
  res.json({ message: "Capstone Get doctor by id request successful" });
});

router.get("/patients", (req, res) => {
  res.json({ message: "Capstone Get all patients request successful" });
});

router.get("/patients/:id", (req, res) => {
  res.json({ message: "Capstone Get patient by id request successful" });
});

//POST API USED
router.post("/login", (req, res) => {
  res.json({ message: "Created a new user" });
});

router.post("/new-doctor", (req, res) => {
  res.json({ message: "Created a new doctor" });
});

router.post("/new-patient", (req, res) => {
  res.json({ message: "Created a new patient" });
});

//PUT API USED
router.put("/doctor-edit", (req, res) => {
  res.json({ message: "Edited doctor details" });
});

router.put("/patient-edit", (req, res) => {
  res.json({ message: "Edited patient details" });
});

module.exports = router;
