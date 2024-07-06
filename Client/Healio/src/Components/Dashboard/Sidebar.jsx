/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import schedule from "../../Assets/schedule.png";
import doctor from "../../Assets/doctor.png";
import doctors from "../../Assets/user-md.png";
import users from "../../Assets/user (1).png";
import consult from "../../Assets/consultation.png";
import appoint from "../../Assets/calendar.png";
import logout from "../../Assets/logout.png";
import search from "../../Assets/search.png";
import logo from "../../Assets/logo-white.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/LoaderReducer";
import toast from "react-hot-toast";
import cookie from "js-cookie";

function Sidebar({ setActivePage }) {
  const navigateto = useNavigate();
  const dispatch = useDispatch();
  const { userData: data } = useSelector((state) => state.userData);
  console.log(data);

  const loggingOut = () => {
    const token = cookie.get("token");

    if (token) {
      dispatch(ShowLoading());

      setTimeout(() => {
        cookie.remove("token");
        localStorage.clear();
        navigateto("/");

        window.location.reload();
        dispatch(HideLoading());
      }, 1000);

      toast.success("Logged Out Successfully");
    }
  };

  return (
    <div className="sticky top-0 h-screen">
      <div className="flex justify-center items-center h-screen w-72">
        <div className=" flex flex-col rounded-2xl bg-[#267c7e] h-[96%] w-64 font-poppins">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center pt-8">
              <div>
                <img src={logo} className="h-10 w-10" />
              </div>
              <div className="text-2xl text-left font-bold text-white p-4">
                Healio
              </div>
            </div>

            <hr className="border-t-2 border-gray-300" />
            <div className="text-base text-white font-light">
              Role : {data.role ? data.role : "Admin"}
            </div>
          </div>

          {data.isadmin ? (
            <div className="ml-2 mt-10 mr-2">
              <Link
                to="/AllPatients"
                data={data}
                onClick={() => setActivePage("adminPatients")}
              >
                <div className=" mt-2 flex p-2 hover:border rounded-lg hover:border-white">
                  <div className="flex flex-row items-center justify-center cursor-pointer">
                    <img src={users} alt="Users" className="h-6 mr-2" />
                    <p className="text-white ml-2">Patients</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/Alldoctors"
                data={data}
                onClick={() => setActivePage("adminDoctors")}
              >
                <div className="mt-2 flex p-2 hover:border rounded-lg hover:border-white">
                  <div className="flex flex-row items-center cursor-pointer">
                    <img src={doctors} alt="Doctors" className="h-6 mr-2" />
                    <p className="text-white ml-2">Doctors</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/Allconsult"
                data={data}
                onClick={() => setActivePage("adminConsult")}
              >
                <div className="mt-2 flex p-2 hover:border rounded-lg hover:border-white">
                  <div className="flex flex-row items-center cursor-pointer">
                    <img
                      src={consult}
                      alt="Consultations"
                      className="h-6 mr-2"
                    />
                    <p className="text-white ml-2">Consultations</p>
                  </div>
                </div>
              </Link>
            </div>
          ) : data.role === "Doctor" ? (
            <div className="ml-4 mt-10 mr-2 text-lg ">
              <Link
                to="/doctorConsultations"
                data={data}
                onClick={() => setActivePage("doctorConsultations")}
              >
                <div className="mt-2 flex p-2 hover:border rounded-lg hover:border-white">
                  <div className="flex flex-row items-center justify-center cursor-pointer">
                    <img
                      src={users}
                      alt="My Consultations"
                      className="h-6 mr-2"
                    />
                    <p className="text-white ml-2">My Consultations</p>
                  </div>
                </div>
              </Link>

              <Link to="/attendedPatients"
              data={data}
              onClick={()=> setActivePage("attendedPatients")}>
              <div className="mt-2 flex p-2 hover:border rounded-lg hover:border-white">
                <div className="flex flex-row items-center cursor-pointer">
                  <img
                    src={consult}
                    alt="Attended Patients"
                    className="h-6 mr-2"
                  />
                  <p className="text-white ml-2">Attended Patients</p>
                </div>
              </div>
              </Link>

              <Link
                to="/PersonalProfile"
                data={data}
                onClick={() => setActivePage("personalProfile")}
              >
                <div className="mt-2 flex p-2 hover:border rounded-lg hover:border-white">
                  <div className="flex flex-row items-center cursor-pointer">
                    <img
                      src={users}
                      alt="Personal Profile"
                      className="h-6 mr-2"
                    />
                    <p className="text-white ml-2">Personal Profile</p>
                  </div>
                </div>
              </Link>
            </div>
          ) : data.role === "Patient" ? (
            <div className="ml-4 mt-10 mr-2">
              <Link to="/PatientAppointments"
              onClick={()=>setActivePage("patientAppointments")}>
              <div className="mt-2 flex p-2 hover:border rounded-lg hover:border-white">
                <div className="flex flex-row items-center justify-center cursor-pointer">
                  <img
                    src={appoint}
                    alt="My Appointments"
                    className="h-6 mr-2"
                  />
                  <p className="text-white ml-2">My Appointments</p>
                </div>
              </div>
              </Link>

              <Link to="/consult" onClick={()=> setActivePage("consult")}>
              <div className="mt-2 flex p-2 hover:border rounded-lg hover:border-white">
                <div className="flex flex-row items-center cursor-pointer">
                  <img
                    src={consult}
                    alt="Book a Consultation"
                    className="h-6 mr-2"
                  />
                  <p className="text-white ml-2">Book a Consultation</p>
                </div>
              </div>
              </Link>


              <Link
                to="/PersonalProfile"
                data={data}
                onClick={() => setActivePage("personalProfile")}
              >
                <div className="mt-2 flex p-2 hover:border rounded-lg hover:border-white">
                  <div className="flex flex-row items-center cursor-pointer">
                    <img
                      src={users}
                      alt="Personal Profile"
                      className="h-6 mr-2"
                    />
                    <p className="text-white ml-2">Personal Profile</p>
                  </div>
                </div>
              </Link>
            </div>
          ) : null}

          <div className="absolute bottom-0 left-16 right-16 p-4">
            <div className="w-max pb-2">
              <div className="flex flex-row items-center justify-center cursor-pointer">
                <div className="flex my-4">
                  <button onClick={loggingOut} className="flex">
                    <img src={logout} alt="logout" className="h-6 mr-2" />
                    <p className="text-white">Log Out</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
