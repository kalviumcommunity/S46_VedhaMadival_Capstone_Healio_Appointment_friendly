const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
    {
        userId: {
            type:String,
            required: true,
        },
        firstname: {
            type:String,
            required: true,
        },
        lastname: {
            type:String,
            required: true,
        },
        email: {
            type:String,
            required: true,
        },
        phoneNumber: {
            type:String,
            required: true,
        },
        website: {
            type:String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        experience: {
            type:String,
            required: true,
        },
        feePerConsultation: {
            type:Number,
            required: true,
        },
        calEventypeLink: {
            type:String,
            required: true,
        },
        fromTime: {
            type:String,
            required:true,
        },
        toTime: {
            type:String,
            required:true,
        },
        status: {
            type: String,
            default: "pending",
        },
    }, 
    {
        timestamps: true,
    }  
);

const doctorModel = mongoose.model("doctors" , doctorSchema);

module.exports = doctorModel;