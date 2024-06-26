import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

function Appointment() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();


  return (
    <div>
      <h1>Book Appointment</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="patientName" placeholder="Patient Name" onChange={handleChange} />
        <input type="email" name="patientEmail" placeholder="Patient Email" onChange={handleChange} />
        <input type="date" name="appointmentDate" onChange={handleChange} />
        <input type="time" name="appointmentTime" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Appointment;
