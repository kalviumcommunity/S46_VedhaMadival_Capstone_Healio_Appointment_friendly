/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { SetAuthenticated } from "../../Redux/AuthenticateReducer";

function ConsultHere() {
  const [doctorsdata, setDoctorsData] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = cookie.get("token");
    if (token) {
      dispatch(SetAuthenticated());
    }
  }, [dispatch]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await axios.get("https://s46-vedhamadival-capstone-healio.onrender.com/doctors", {
          headers: {
            Authorization: "Bearer " + cookie.get("token"),
          },
        });
        // return response.data.data;
        console.log(response.data.data);
        setDoctorsData(response.data.data);
        console.log(doctorsdata);
      } catch (error) {
        console.log(error);
      }
    };
    getDoctors();
  }, []);

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-screen-xl px-4 lg:px-0">
        <h1 className="text-3xl font-poppins font-bold py-4">
          Find your Doctor
        </h1>
        {/* <div className="mr-4">
              <img src={search} className="h-8" />
            </div> */}

        <div className="flex flex-row items-center justify-center w-full mt-10">
          <div className="w-[50%] mr-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-black border-spacing-5 active:border-gray-600 rounded-sm h-12 font-poppins p-2"
            />
          </div>

          <div>
            <button className="bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold font-poppins py-2 px-4 text-base rounded h-12">
              Search
            </button>
          </div>
        </div>

        {isAuthenticated ? (
          <div className="p-14 grid grid-cols-3 gap-4">
            {doctorsdata &&
              doctorsdata.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="border border-black rounded-lg font-poppins"
                  >
                    <div className="p-4">
                      <div>
                        <strong>Name:</strong> {data.firstname} {data.lastname}
                      </div>
                      <div>
                        <strong>Speciality:</strong> {data.specialization}
                      </div>
                      <div>
                        <strong>Fee:</strong> {data.feePerConsultation}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Link to={`/Booking/${data._id}`}>
                        {" "}
                        <button className="bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold font-poppins py-2 px-4 text-base rounded h-10 mb-2">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="max-w-md mt-10 mx-auto bg-slate-100 shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Login to Access Doctor Booking</h2>
            <p className="text-gray-600 mb-4">
              To access and book doctors, please login or sign up for an account.
            </p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default ConsultHere;
