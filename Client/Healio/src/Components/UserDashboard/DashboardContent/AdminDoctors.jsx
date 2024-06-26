import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../Redux/LoaderReducer";
import { toast } from "react-hot-toast";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function AdminDoctors() {
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axios.get("http://localhost:4000/doctors", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.data.success) {
          const doctors = response.data.data;
          const approved = doctors.filter(
            (doctor) => doctor.status === "Approved"
          );
          const pending = doctors.filter(
            (doctor) => doctor.status === "Pending"
          );
          setApprovedDoctors(approved);
          setPendingDoctors(pending);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        dispatch(HideLoading());
      } catch (error) {
        console.log(error);
        dispatch(HideLoading());
      }
    };
    fetchData();
  }, [dispatch]);

  const handleApprove = async (doctorId) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.put(
        `http://localhost:4000/approve-doctor/${doctorId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        const updatedPending = pendingDoctors.filter(
          (doctor) => doctor._id !== doctorId
        );
        const approvedDoctor = pendingDoctors.find(
          (doctor) => doctor._id === doctorId
        );

        // Update state using the state updater function to ensure latest state
        setApprovedDoctors((prevApprovedDoctors) => [
          ...prevApprovedDoctors,
          approvedDoctor,
        ]);
        setPendingDoctors(updatedPending);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      console.log(error);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="p-6 border border-slate-500 h-[80% ] mt-6 mr-4 rounded-lg">
      <div className="font-poppins text-xl h-full">
        <Tabs>
          <TabList>
            <Tab>Approved Doctors</Tab>
            <Tab>Pending Doctors</Tab>
          </TabList>

          <TabPanel>
            {approvedDoctors.length > 0 ? (
              approvedDoctors.map((doctor) => (
                <div key={doctor._id} className="p-2 border-b-2 border-slate-500 h-[80% ] mt-6 mr-4">
                  <div className="flex justify-between">
                    <div className="flex">
                      {" "}
                      <p>
                        {doctor.firstname} {doctor.lastname}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-red-500">{doctor.specialization}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-6">No approved doctors found</p>
            )}
          </TabPanel>

          <TabPanel>
            {pendingDoctors.length > 0 ? (
              pendingDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="flex justify-between items-center p-2 border-b-2 border-slate-500 h-[80% ] mt-6 mr-4"
                >
                  <div className="flex">
                    <p>
                      {doctor.firstname} {doctor.lastname} -
                    </p>
                    <p className="text-red-500 ml-2">{doctor.specialization}</p>
                  </div>
                  <div className="flex">
                    <button
                      className="text-base text-blue-500  hover:bg-red-300 font-bold py-2 px-4 border border-grey-100 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleApprove(doctor._id)}
                    >
                      Approve
                    </button>
                    <button className="ml-2 text-base text-red-500  hover:bg-[#37bfc47d] font-bold py-2 px-4 border border-grey-100 rounded focus:outline-none focus:shadow-outline">
                      Disapprove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-6">No pending doctors found</p>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminDoctors;
