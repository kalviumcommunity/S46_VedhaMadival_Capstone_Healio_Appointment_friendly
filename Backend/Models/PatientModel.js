const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const patientSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        dob:{
            type: String,
            required: true,
        },
        gender:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


const patientModel = mongoose.model("Patients", patientSchema);

module.exports = patientModel;