/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../Redux/LoaderReducer";
import axios from "axios";
import toast from "react-hot-toast";
import cookie from "js-cookie"

function PatientDetails() {
  const dispatch = useDispatch();
  const { userData: data } = useSelector((state) => state.userData);
  const userId = data._id;
  const [submitted, setSubmitted] = useState(
    localStorage.getItem("submitted") || false
  );
  const [patientData, setPatientData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://s46-vedhamadival-capstone-healio.onrender.com/patient-details",
        { ...formData, userId },
        {
          headers: {
            Authorization: "Bearer " + cookie.get("token"),
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setSubmitted(localStorage.setItem("submitted", true));
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      console.error("Error submitting form:", error);
      // toast.error("Something went wrong");
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axios.get(
          "https://s46-vedhamadival-capstone-healio.onrender.com/get-patient-details",
          {
            headers: {
              Authorization: "Bearer " + cookie.get("token"),
            },
            params: { userId },
          }
        );

        if (response.data.success) {
          setPatientData(response.data.data);
          setSubmitted(true);
          toast.success(response.data.message);
        } else {
          setSubmitted(false);
          toast.error(response.data.message);
        }

        dispatch(HideLoading());
      } catch (error) {
        console.error("Error fetching patient details:", error);
        dispatch(HideLoading());
      }
    };
    fetchData();
  }, [dispatch, userId]);

  return (
    <div>
      {submitted ? (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-[#267c7e] text-white">
            <h2 className="text-xl font-semibold font-poppins">Healio Patient ID</h2>
          </div>
          <div className="p-4 font-poppins">
            <div className="mb-4">
              <span className="font-bold">Full Name:</span>{" "}
              {patientData.fullname}
            </div>
            <div className="mb-4">
              <span className="font-bold">Date of Birth:</span>{" "}
              {patientData.dob}
            </div>
            <div className="mb-4">
              <span className="font-bold">Gender:</span> {patientData.gender}
            </div>
            <div className="mb-4">
              <span className="font-bold">Email Id:</span> {patientData.email}
            </div>
            <div className="mb-4">
              <span className="font-bold">Mobile:</span>{" "}
              {patientData.phoneNumber}
            </div>
            <div className="mb-4">
              <span className="font-bold">Address:</span> {patientData.address}
            </div>
          </div>
        </div>
      ) : (
        <form
          className="flex flex-col gap-5 font-poppins"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name :
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Full name"
              className="h-10 p-2 border focus:border-[#267c7e] rounded-md focus:outline-none focus:shadow-outline shadow-sm block w-full sm:text-sm"
              {...register("fullname", {
                required: "FullName is required",
                minLength: {
                  value: 3,
                  message: "FullName must be atleast 3 characters long.",
                },
              })}
            />
            {errors.fullname && <p>{errors.fullname.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth :
            </label>
            <input
              type="date"
              id="dob"
              name="date of birth"
              placeholder="Date of Birth"
              className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
              {...register("dob", {
                required: "Date of Birth is required",
                minLength: {
                  value: 3,
                  message: "Date of Birth must be atleast 3 characters long.",
                },
              })}
            />
            {errors.dob && <p>{errors.dob.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender :
            </label>

            <select
              className=" h-10 p-2 border-gray-300 rounded-md focus:outline-none focus:shadow-outline block w-full sm:text-sm"
              {...register("gender", {
                required: "Gender is required",
              })}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email :
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className=" h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number :
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              className=" h-10 p-2  border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a 10 digit number",
                },
              })}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address :
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              className=" h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
              {...register("address", {
                required: "Address is required",
              })}
            />
            {errors.address && <p>{errors.address.message}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="text-base bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PatientDetails;
