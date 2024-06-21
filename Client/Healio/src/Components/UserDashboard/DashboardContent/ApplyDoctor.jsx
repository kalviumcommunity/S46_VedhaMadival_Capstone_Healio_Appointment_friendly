/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../../Redux/LoaderReducer";
import axios from "axios";
import toast from "react-hot-toast";

function ApplyDoctor({ datas }) {
  // const navigateto = useNavigate();
  const dispatch = useDispatch();
  const { userData: data } = useSelector((state) => state.userData);
  const userId = data._id;

  const [applied, setApplied] = useState(
    localStorage.getItem("Applied") || false
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      dispatch(ShowLoading());

      const response = await axios.post(
        "http://localhost:4000/apply-doctor-account",
        {
          ...data,
          userId: userId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data.exists) {
        toast.error("Doctor with same Email ID already Exists!");
        dispatch(HideLoading());
      } else {
        setApplied(localStorage.setItem("Applied", true));
        setTimeout(() => {
          toast("You will be Notified once your Request is Approved");
          dispatch(HideLoading());
        }, 1000);

        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch {
      console.log(errors);
      console.log("error");
      toast.error("Something went wrong");
      dispatch(HideLoading());
    }
  };

  return (
    <div className="h-80vh">
      <div className="p-2 border border-slate-500 h-[80% ] mt-6 mr-4 rounded-lg">
        <div className="font-poppins text-xl h-full">
          {applied ? (
            <div className="font-bold text-2xl flex items-center justify-center">
              Wait For Approval!!
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
                    {...register("firstname", {
                      required: "FirstName is required",
                      minLength: {
                        value: 3,
                        message: "FirstName must be atleast 3 characters long.",
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
                    {...register("lastname", {
                      required: "LastName is required",
                      minLength: {
                        value: 3,
                        message: "LastName must be atleast 3 characters long.",
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
                    Website :
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    placeholder="Website"
                    className=" h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
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
                    className=" h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                  {errors.address && <p>{errors.address.message}</p>}
                </div>

                <hr className="my-6" />

                <h2 className="font-bold text-xl mb-5 text-slate-500  text-left">
                  Professional Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Specialization :
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    placeholder="Specialization"
                    className=" h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
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
                    placeholder="experience"
                    className="  h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
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
                    id="fee"
                    placeholder="fee"
                    className="b h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    {...register("feePerConsultation", {
                      required: "Fee is required",
                    })}
                  />
                  {errors.feePerConsultation && (
                    <p>{errors.feePerConsultation.message}</p>
                  )}
                </div>

                <hr className="my-6" />

                <h2 className="font-bold text-xl mb-5 text-slate-500  text-left">
                  Schedule Booking Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cal.com EventType Link :
                  </label>
                  <input
                    type="url"
                    id="eventTypeLink"
                    placeholder="EventTypeLink"
                    className=" h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
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
                    id="api_key"
                    placeholder="Api_key"
                    className=" h-10 p-2 border border-gray-300 focus:border-[#267c7e] rounded-md shadow-sm focus:outline-none focus:shadow-outline block w-full sm:text-sm"
                    {...register("apikey", {
                      required: "EventTypeLink is required",
                    })}
                  />
                  {errors.apikey && (
                    <p>{errors.apikey.message}</p>
                  )}
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
