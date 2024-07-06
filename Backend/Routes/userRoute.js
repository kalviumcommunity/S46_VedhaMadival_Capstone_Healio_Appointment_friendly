const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const Patient = require("../Models/PatientModel");
const Doctor = require("../Models/DoctorModel");
const webhook = require("../Models/WebhookModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middlewares/authMiddleware");

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
        role: user.role,
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
router.get("/get-patient-details", authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.body.userId });

    if (!patient) {
      return res.status(400).send({ message: "Patient not found" });
    }

    return res
      .status(200)
      .send({
        message: "Patient Details Fetched",
        success: true,
        data: patient,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting in the backend", success: false, error });
  }
});

//Storing Doctor Details
router.post("/doctor-details", authMiddleware, async (req, res) => {
  try {
    //Checking Existing doctor
    const { email } = req.body;
    const existingDoctor = await Doctor.findOne({
      email,
    });

    if (existingDoctor) {
      return res.status(200).send({ exists: true });
    } else {
      const newdoctor = new Doctor({ ...req.body, status: "Pending" });
      console.log(newdoctor);
      await newdoctor.save();

      const adminUser = await User.findOne({ isadmin: true });

      const unseenNotifications = adminUser.unseenNotifications;
      unseenNotifications.push({
        type: "Doctor-Approval-Pending",
        message: `${newdoctor.firstname} ${newdoctor.lastname} has applied for a doctor account`,
        data: {
          doctorId: newdoctor._id,
          name: newdoctor.firstname + " " + newdoctor.lastname,
        },
        onClickPath: "/admin/doctors",
      });
      await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
      res.status(200).send({
        message: "Doctor Application Submitted Successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error Applying as a Doctor", success: false });
  }
});

//Getting Doctor Details of a single Doctor for Profile
router.get("/get-doctor-details", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });

    if (doctor) {
      res.status(200).send({ success: true, data: doctor });
    } else {
      res.status(404).send({ success: false, message: "Doctor not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error fetching doctor details", success: false });
  }
});

//Getting Doctor Details of a single Doctor for Booking
router.get("/get-doctor-by-id/:doctorId", authMiddleware, async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .send({ message: "Doctor does not exist", success: false });
    } else {
      res.status(200).send({
        message: "Doctor found",
        success: true,
        data: {
          _id: doctor._id,
          userId: doctor.userId,
          firstname: doctor.firstname,
          lastname: doctor.lastname,
          email: doctor.email,
          phoneNumber: doctor.phoneNumber,
          website: doctor.website,
          address: doctor.address,
          specialization: doctor.specialization,
          experience: doctor.experience,
          feePerConsultation: doctor.feePerConsultation,
          calEventypeLink: doctor.calEventypeLink,
          apikey: doctor.apikey,
          status: doctor.status,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error getting in the backend", success: false, error });
  }
});

//Getting All Doctors
router.get("/doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});

    res.status(200).send({
      message: "All doctors retrieved successfully",
      success: true,
      data: doctors.map((doctor) => ({
        _id: doctor._id,
        firstname: doctor.firstname,
        lastname: doctor.lastname,
        email: doctor.email,
        phoneNumber: doctor.phoneNumber,
        website: doctor.website,
        address: doctor.address,
        specialization: doctor.specialization,
        experience: doctor.experience,
        feePerConsultation: doctor.feePerConsultation,
        calEventypeLink: doctor.calEventypeLink,
        apikey: doctor.apikey,
        status: doctor.status,
        seenNotifications: doctor.seenNotifications || [],
        unseenNotifications: doctor.unseenNotifications || [],
        isdoctor: doctor.isdoctor || false,
        isadmin: doctor.isadmin || false,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting doctors info", success: false, error });
  }
});

//To Approve the Doctors
router.put("/approve-doctor/:id", authMiddleware, async (req, res) => {
  const doctorId = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { status: "Approved" }, 
      { new: true }
    );
    if (!updatedDoctor) {
      return res
        .status(404)
        .send({ message: "Doctor not found", success: false });
    }
    res
      .status(200)
      .send({ message: "Doctor approved successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error approving doctor", success: false, error });
  }
});

// Getting Doctor Meeting Information
router.get('/api/meetings/doctor/:email', authMiddleware, async (req, res) => {
  const { email } = req.params;

  let query = { 'payload.organizer.email': email };

  try {
    const meetings = await webhook.find(query).sort({ 'payload.startTime': 1 });
    res.json(meetings);
  } catch (error) {
    console.error('Error fetching doctor meetings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Getting Patient Appointment Information
router.get('/api/meetings/patient/:email', authMiddleware, async (req, res) => {
  const { email } = req.params;

  try {
    const meetings = await webhook.find({ 'payload.attendees.0.email': email }).sort({ 'payload.startTime': 1 });
    res.json(meetings);
  } catch (error) {
    console.error('Error fetching patient meetings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



















//PUT API USED
router.put("/doctor-edit", (req, res) => {
  res.json({ message: "Edited doctor details" });
});

router.put("/patient-edit", (req, res) => {
  res.json({ message: "Edited patient details" });
});

module.exports = router;
