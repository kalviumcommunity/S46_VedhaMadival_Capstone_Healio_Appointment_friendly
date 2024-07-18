/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/LoaderReducer";
import { toast } from "react-hot-toast";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import cookie from "js-cookie"

function AdminDoctors() {
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axios.get("https://s46-vedhamadival-capstone-healio.onrender.com/doctors", {
          headers: {
            Authorization: "Bearer " + cookie.get("token"),
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
        `https://s46-vedhamadival-capstone-healio.onrender.com/approve-doctor/${doctorId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + cookie.get("token"),
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
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#267c7e] text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Specialization
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {approvedDoctors.map((doctor) => (
                    <tr key={doctor._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {doctor.firstname} {doctor.lastname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doctor.specialization}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-6">No approved doctors found</p>
            )}
          </TabPanel>

          <TabPanel>
            {pendingDoctors.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#267c7e] text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Specialization
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingDoctors.map((doctor) => (
                    <tr key={doctor._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {doctor.firstname} {doctor.lastname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doctor.specialization}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="text-sm text-white bg-[#267c7e] font-bold py-2 px-4 border border-grey-100 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleApprove(doctor._id)}
                        >
                          Approve
                        </button>
                        <button className="ml-2 text-sm text-[#267c7e] font-bold py-2 px-4 border border-grey-100 rounded focus:outline-none focus:shadow-outline">
                          Disapprove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
