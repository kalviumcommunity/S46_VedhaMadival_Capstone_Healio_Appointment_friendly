/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PatientDetails from "../Patient/PatientDetails";
import ApplyDoctor from "../Doctor/ApplyDoctor";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/LoaderReducer";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

function PersonalProfile() {
  const { userData: data } = useSelector((state) => state.userData);
  const userId = data._id;
  console.log(data);
  const dispatch = useDispatch();

  return (
    <div className="flex w-full">
      <div className="items-center w-full border border-slate-500 rounded-lg p-4 mt-4 mr-4">
        <div>
          <div className="font-bold font-poppins text-3xl">
            Personal Profile
          </div>

          <div>
            {data.role === "Patient" ? (
              <div>
                <PatientDetails />
              </div>
            ) : (
              <div>
                <ApplyDoctor />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProfile;
