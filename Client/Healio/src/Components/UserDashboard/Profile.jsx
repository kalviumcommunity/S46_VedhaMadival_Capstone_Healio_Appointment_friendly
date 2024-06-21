import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetAuthenticated } from "../../Redux/AuthenticateReducer";
import { HideLoading, ShowLoading } from "../../Redux/LoaderReducer";
import toast from "react-hot-toast";
import AdminConsult from "./DashboardContent/AdminConsult";
import ApplyDoctor from "./DashboardContent/ApplyDoctor";
import { setData } from "../../Redux/UserInfoReducer";
import AdminUsers from "./DashboardContent/AdminUsers";
import AdminDoctors from "./DashboardContent/AdminDoctors";
import PersonalProfile from "./DashboardContent/PersonalProfile";

function Profile() {
  // const [data, setdata] = useState({});
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.isAuthenticated);
  const { userData } = useSelector((state) => state.userData);

  const [activePage, setActivePage] = useState(
    localStorage.getItem("activePage") || ""
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
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
                Authorization: "Bearer " + localStorage.getItem("token"),
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
          {activePage === "AdminUsers" && <AdminUsers />}
          {activePage === "AdminDoctors" && <AdminDoctors />}
          {activePage === "AdminConsult" && <AdminConsult />}
          {activePage === "ApplyDoctor" && <ApplyDoctor />}
          {activePage === "PersonalProfile" && <PersonalProfile />}
        </div>
      </div>
    </>
  );
}

export default Profile;
