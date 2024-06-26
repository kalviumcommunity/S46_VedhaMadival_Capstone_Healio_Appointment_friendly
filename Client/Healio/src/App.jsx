import "./App.css";
import Login from "./Components/Account/Login";
import SignUp from "./Components/Account/SignUp";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import Profile from "./Components/UserDashboard/Profile";
import AdminUsers from "./Components/UserDashboard/DashboardContent/AdminUsers";
import AdminDoctors from "./Components/UserDashboard/DashboardContent/AdminDoctors";
import AdminConsult from "./Components/UserDashboard/DashboardContent/AdminConsult";
import ApplyDoctor from "./Components/UserDashboard/DashboardContent/ApplyDoctor";
import PersonalProfile from "./Components/UserDashboard/DashboardContent/PersonalProfile";
import Notifications from "./Components/UserDashboard/Notifications";
import ConsultHere from "./Components/ConsultHere";
import Book from "./Components/Book";
import Appointment from "./Components/Appointment";

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
        <Route path="/Notifications" element={<Notifications/>}/>
        <Route path="/Consult" element={<ConsultHere/>}/>
        <Route path="/Booking/:doctorId" element={<Book/>}/>
        <Route path="/Appointment" element={<Appointment/>}/>
        <Route
          path="/Allusers"
          element={
            <Profile>
              <AdminUsers
               />
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
      </Routes>
    </>
  );
}

export default App;
