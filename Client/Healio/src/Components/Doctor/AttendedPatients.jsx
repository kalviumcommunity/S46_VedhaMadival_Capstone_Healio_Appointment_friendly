import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookie from "js-cookie";
import { HideLoading, ShowLoading } from "../../Redux/LoaderReducer";

function AttendedPatients() {
  const dispatch = useDispatch();

  const [attendedPatients, setAttendedPatients] = useState([]);
  const { userData: data } = useSelector((state) => state.userData);
  const userId = data._id;
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://s46-vedhamadival-capstone-healio.onrender.com/get-doctor-details",
          {
            headers: {
              Authorization: "Bearer " + cookie.get("token"),
            },
            params: { userId },
          }
        );
        if (response.data.success) {
          setEmail(response.data.data.email);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchMeetings = async () => {
      if (!email) return;
      try {
        dispatch(ShowLoading());
        const response = await axios.get(
          `https://s46-vedhamadival-capstone-healio.onrender.com/api/meetings/doctor/${email}`,
          {
            headers: {
              Authorization: "Bearer " + cookie.get("token"),
            },
          }
        );
        // Extract attended patients with additional notes
        const attended = response.data.filter(
          (meeting) =>
            meeting.payload.organizer.email === email &&
            meeting.payload.attendees.length > 0
        );
        setAttendedPatients(attended);
        dispatch(HideLoading());
      } catch (error) {
        console.error("Error fetching meetings:", error);
        dispatch(HideLoading());
      }
    };
    fetchMeetings();
  }, [email, dispatch]);

  return (
    <div>
      <div className="p-2 border border-slate-500 h-[80%] mt-6 mr-4 rounded-lg">
        <h1 className="font-poppins font-bold text-2xl mb-4 p-2">Patients List</h1>
        {attendedPatients.length > 0 ? (
          <ul className="list-disc pl-6 font-poppins">
            {attendedPatients.map((meeting, index) => (
              <li key={index} className="mb-4">
                <h2 className="text-lg font-bold">
                  Patient : {meeting.payload.attendees[0].name}
                </h2>
                <p className="text-gray-600 mb-1">
                  Additional Notes : {meeting.payload.additionalNotes}</p>
                <p className="text-gray-500">
                  Date:{" "}
                  {new Date(meeting.payload.startTime).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No attended patients found.</p>
        )}
      </div>
    </div>
  );
}

export default AttendedPatients;
