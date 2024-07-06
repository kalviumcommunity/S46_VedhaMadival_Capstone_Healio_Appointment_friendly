import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetAuthenticated } from "../../Redux/AuthenticateReducer";
import { HideLoading, ShowLoading } from "../../Redux/LoaderReducer";
import toast from "react-hot-toast";
import AdminConsult from "../Admin/AdminConsult";
import ApplyDoctor from "../Doctor/ApplyDoctor";
import { setData } from "../../Redux/UserInfoReducer";
import AdminUsers from "../Admin/AdminPatients";
import AdminDoctors from "../Admin/AdminDoctors";
import PersonalProfile from "./PersonalProfile";
import cookie from "js-cookie";
import DoctorConsultations from "../Doctor/DoctorConsultations";
import AttendedPatients from "../Doctor/AttendedPatients";
import PatientAppointments from "../Patient/PatientAppointments";
import ConsultHere from "../HomePage/ConsultHere";
import AdminPatients from "../Admin/AdminPatients";

function Profile() {
  // const [data, setdata] = useState({});
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.isAuthenticated);
  const { userData } = useSelector((state) => state.userData);

  const [activePage, setActivePage] = useState(
    localStorage.getItem("activePage") || ""
  );

  useEffect(() => {
    const token = cookie.get("token");
    if (token) {
      dispatch(SetAuthenticated());
    }
    dispatch(ShowLoading());
    setTimeout(() => {
      // toast("View your profile");
      dispatch(HideLoading());
    }, 500);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const getData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:4000/user-info-by-id",
            {
              headers: {
                Authorization: "Bearer " + cookie.get("token"),
              },
            }
          );
          dispatch(setData(response.data.data));
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  return (
    <>
      <div className="flex">
        <div>
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            key={activePage}
          />
        </div>

        <div className="w-full">
          <Header />
          {activePage === "adminPatients" && <AdminPatients />}
          {activePage === "adminDoctors" && <AdminDoctors />}
          {activePage === "adminConsult" && <AdminConsult />}
          {activePage === "applyDoctor" && <ApplyDoctor />}
          {activePage === "personalProfile" && <PersonalProfile />}
          {activePage === "doctorConsultations" && <DoctorConsultations />}
          {activePage === "attendedPatients" && <AttendedPatients />}
          {activePage === "patientAppointments" && <PatientAppointments />}
          {activePage === "consult" && <ConsultHere />}
        </div>
      </div>
    </>
  );
}

export default Profile;
