/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("https://s46-vedhamadival-capstone-healio.onrender.com/user-info-all");
        if (response.data.success) {
          // Filter users with role === "patient"
          const patientsData = response.data.data.filter(user => user.role === "Patient");
          setPatients(patientsData);
        } else {
          console.error("Error fetching patients:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="w-full">
      <div className="p-2 border border-slate-500 h-[80%] mt-6 mr-4 rounded-lg">
        <h1 className="font-poppins text-xl mb-4">Patients List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#267c7e] font-poppins">
            <thead className="bg-[#267c7e]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-poppins text-white  uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-poppins text-white  uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-poppins text-white  uppercase tracking-wider"
                >
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPatients;
