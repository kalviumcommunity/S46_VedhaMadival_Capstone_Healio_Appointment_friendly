/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../Redux/LoaderReducer";
import axios from "axios";
import toast from "react-hot-toast";
import cookie from "js-cookie";
function ApplyDoctor() {
  const dispatch = useDispatch();
  const [doctorData, setDoctorData] = useState({});
  const { userData: data } = useSelector((state) => state.userData);
  const userId = data._id;

  const [submitted, setSubmitted] = useState(
    localStorage.getItem("Submitted") || false
  );
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://s46-vedhamadival-capstone-healio.onrender.com/doctor-details",
        { ...formData, userId },
        {
          headers: {
            Authorization: "Bearer " + cookie.get("token"),
          },
        }
      );

      if (response.data.exists) {
        toast.error("Doctor with same Email ID already exists!");
      } else {
        localStorage.setItem("Submitted", true);
        setSubmitted(true);
        toast("You will be notified once your request is approved");
        if (response.data.success) {
          toast.success(response.data.message);
          window.location.reload();
        } else {
          toast.error(response.data.message);
        }
      }
      dispatch(HideLoading());
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axios.get(
          "https://s46-vedhamadival-capstone-healio.onrender.com/get-doctor-details",
          {
            headers: {
              Authorization: "Bearer " + cookie.get("token"),
            },
            params: { userId },
          }
        );

        if (response.data.success) {
          setDoctorData(response.data.data);
          setSubmitted(true);
        } else {
          setSubmitted(false);
          toast.error(response.data.message);
        }
        dispatch(HideLoading());
      } catch (error) {
        console.log(error);
        dispatch(HideLoading());
      }
    };
    fetchData();
  }, [dispatch, userId]);

  return (
    <div className="h-80vh">
      <div className="p-2 border border-slate-500 h-[80% ] mt-6 mr-4 rounded-lg">
        <div className="font-poppins text-xl h-full">
          {submitted ? (
            <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4 bg-[#267c7e] text-white">
                <h2 className="font-bold text-2xl">Doctor Details</h2>
              </div>
              <div className="p-2">
                <p className="text-gray-800 p-2 text-base">
                  <strong>First Name :</strong> {doctorData.firstname}
                </p>
                <p className="text-gray-800 p-2 text-base">
                  <strong>Last Name :</strong> {doctorData.lastname}
                </p>
                <p className="text-gray-800 p-2 text-base">
                  <strong>Email :</strong> {doctorData.email}
                </p>
                <p className="text-gray-800 p-2 text-base">
                  <strong>Phone Number :</strong> {doctorData.phoneNumber}
                </p>
                <p className="text-gray-800 p-2 text-base">
                  <strong>Website :</strong> {doctorData.website}
                </p>
                <p className="text-gray-800 p-2 text-base">
                  <strong>Address :</strong> {doctorData.address}
                </p>
                <p className="text-gray-800 p-2 text-base">
                  <strong>Specialization :</strong> {doctorData.specialization}
                </p>
                <p className="text-gray-800 p-2 text-base">
                  <strong>Experience :</strong> {doctorData.experience} years
                </p>
                <p className="text-gray-800 p-2 text-base">
                  <strong>Fee per Consultation :</strong> Rs.
                  {doctorData.feePerConsultation}
                </p>
                <p className="text-gray-800 p-2 text-base">
                  <strong>Cal.com EventType Link :</strong>{" "}
                  {doctorData.calEventypeLink}
                </p>
                <p className="text-gray-800 p-2 text-base">
                  <div className="flex">
                    <strong>Approval Status :</strong>
                    <p className="text-red-500 ml-2">{doctorData.status}</p>
                  </div>
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="font-bold text-xl mb-5 text-slate-500 text-left">
                Personal Information
              </h2>
              <form
                className="flex flex-col gap-5 font-poppins"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Firstname :
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Firstname"
                    className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md focus:outline-none focus:shadow-outline shadow-sm block w-full sm:text-sm"
                    defaultValue={doctorData.firstname || ""}
                    {...register("firstname", {
                      required: "FirstName is required",
                      minLength: {
                        value: 3,
                        message:
                          "FirstName must be at least 3 characters long.",
                      },
                    })}
                  />
                  {errors.firstname && <p>{errors.firstname.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Lastname :
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Lastname"
                    className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    defaultValue={doctorData.lastname || ""}
                    {...register("lastname", {
                      required: "LastName is required",
                      minLength: {
                        value: 3,
                        message: "LastName must be at least 3 characters long.",
                      },
                    })}
                  />
                  {errors.lastname && <p>{errors.lastname.message}</p>}
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
                    className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    defaultValue={doctorData.email || ""}
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
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    defaultValue={doctorData.phoneNumber || ""}
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
                    Website :
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    placeholder="Website"
                    className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    defaultValue={doctorData.website || ""}
                    {...register("website", {
                      required: "Website is required",
                    })}
                  />
                  {errors.website && <p>{errors.website.message}</p>}
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
                    className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    defaultValue={doctorData.address || ""}
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                  {errors.address && <p>{errors.address.message}</p>}
                </div>
                <hr className="my-6" />
                <h2 className="font-bold text-xl mb-5 text-slate-500 text-left">
                  Professional Information
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Specialization :
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    placeholder="Specialization"
                    className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    defaultValue={doctorData.specialization || ""}
                    {...register("specialization", {
                      required: "Specialization is required",
                    })}
                  />
                  {errors.specialization && (
                    <p>{errors.specialization.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Experience :
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    placeholder="Experience"
                    className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    defaultValue={doctorData.experience || ""}
                    {...register("experience", {
                      required: "Experience is required",
                    })}
                  />
                  {errors.experience && <p>{errors.experience.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fee per Consultation* :
                  </label>
                  <input
                    type="text"
                    id="feePerConsultation"
                    name="feePerConsultation"
                    placeholder="Fee"
                    className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    defaultValue={doctorData.feePerConsultation || ""}
                    {...register("feePerConsultation", {
                      required: "Fee is required",
                    })}
                  />
                  {errors.feePerConsultation && (
                    <p>{errors.feePerConsultation.message}</p>
                  )}
                </div>
                <hr className="my-6" />
                <h2 className="font-bold text-xl mb-5 text-slate-500 text-left">
                  Schedule Booking Information
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cal.com EventType Link :
                  </label>
                  <input
                    type="text"
                    id="calEventypeLink"
                    name="calEventypeLink"
                    placeholder="EventTypeLink"
                    className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    defaultValue={doctorData.calEventypeLink || ""}
                    {...register("calEventypeLink", {
                      required: "EventTypeLink is required",
                    })}
                  />
                  {errors.calEventypeLink && (
                    <p>{errors.calEventypeLink.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your Cal.com API KEY :
                  </label>
                  <input
                    type="text"
                    id="apikey"
                    name="apikey"
                    placeholder="Api_key"
                    className="h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    defaultValue={doctorData.apikey || ""}
                    {...register("apikey", {
                      required: "API key is required",
                    })}
                  />
                  {errors.apikey && <p>{errors.apikey.message}</p>}
                </div>
                <div>
                  <button
                    type="submit"
                    className="text-base bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4"
                  >
                    Apply
                  </button>
                </div>
              </form>
              <h2 className="font-light text-xs text-center">
                Wait for approval from &copy; Healio+ Department
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplyDoctor;
