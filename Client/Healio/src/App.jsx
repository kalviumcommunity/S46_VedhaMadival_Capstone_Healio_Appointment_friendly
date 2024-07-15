import "./App.css";
import Login from "./Components/Account/Login";
import SignUp from "./Components/Account/SignUp";
import Home from "./Components/HomePage/Home";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import Profile from "./Components/Dashboard/Profile";
import AdminUsers from "./Components/Admin/AdminPatients";
import AdminDoctors from "./Components/Admin/AdminDoctors";
import AdminConsult from "./Components/Admin/AdminConsult";
import ApplyDoctor from "./Components/Doctor/ApplyDoctor";
import PersonalProfile from "./Components/Dashboard/PersonalProfile";
import Notifications from "./Components/Dashboard/Notifications";
import ConsultHere from "./Components/HomePage/ConsultHere";
import Book from "./Components/HomePage/Book";
import DoctorConsultations from "./Components/Doctor/DoctorConsultations";
import AttendedPatients from "./Components/Doctor/AttendedPatients";
import PatientAppointments from "./Components/Patient/PatientAppointments";
import AdminPatients from "./Components/Admin/AdminPatients";
import Services from "./Components/HomePage/Services";

function App() {
  const { loading } = useSelector((state) => state.loader);
  return (
    <>
      {loading && (
        <div className="spinner flex justify-center items-center h-screen">
          <HashLoader color="#36d7b7" className="h-16" />
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Consult" element={<ConsultHere />} />
        <Route path="/Booking/:doctorId" element={<Book />} />
        <Route path="/Services" element={<Services/>}/>
        <Route
          path="/Allpatients"
          element={
            <Profile>
              <AdminPatients />
            </Profile>
          }
        />
        <Route
          path="/Alldoctors"
          element={
            <Profile>
              <AdminDoctors />
            </Profile>
          }
        />
        <Route
          path="/Allconsult"
          element={
            <Profile>
              <AdminConsult />
            </Profile>
          }
        />

        <Route
          path="/ApplyDoc"
          element={
            <Profile>
              <ApplyDoctor />
            </Profile>
          }
        />

        <Route
          path="/PersonalProfile"
          element={
            <Profile>
              <PersonalProfile />
            </Profile>
          }
        />
        <Route
          path="/doctorConsultations"
          element={
            <Profile>
              <DoctorConsultations />
            </Profile>
          }
        />
        <Route
          path="/attendedPatients"
          element={
            <Profile>
              <AttendedPatients />
            </Profile>
          }
        />
        <Route
          path="/PatientAppointments"
          element={
            <Profile>
              <PatientAppointments />
            </Profile>
          }
        />
        <Route
          path="/consult"
          element={
            <Profile>
              <ConsultHere />
            </Profile>
          }
        />
      </Routes>
    </>
  );
}

export default App;
