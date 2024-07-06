import React, { useState, useEffect } from "react";

const Meetings = ({ userType, email }) => {
  const [meetings, setMeetings] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchMeetings = async () => {
      let fetchedMeetings;
      if (userType === "doctor") {
        fetchedMeetings = await getDoctorMeetings(email, filter);
      } else if (userType === "patient") {
        fetchedMeetings = await getPatientMeetings(email, filter);
      }
      setMeetings(fetchedMeetings);
    };
    fetchMeetings();
  }, [filter, userType, email]);

  const getPatientMeetings = async (email, filter) => {
    try {
      const response = await fetch(
        `/api/meetings/patient/${email}?filter=${filter}`
      );
      const meetings = await response.json();
      return meetings;
    } catch (error) {
      console.error("Error fetching patient meetings:", error);
    }
  };
  const getDoctorMeetings = async (email, filter) => {
    try {
      const response = await fetch(
        `/api/meetings/doctor/${email}?filter=${filter}`
      );
      const meetings = await response.json();
      return meetings;
    } catch (error) {
      console.error("Error fetching doctor meetings:", error);
    }
  };

  return (
    <div>
      <h1>{userType === "doctor" ? "Doctor" : "Patient"} Meetings</h1>
      <div>
        <button onClick={() => setFilter("upcoming")}>Upcoming</button>
        {userType === "doctor" && (
          <button onClick={() => setFilter("rescheduled")}>Rescheduled</button>
        )}
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("all")}>All</button>
      </div>
      <ul>
        {meetings.map((meeting) => (
          <li key={meeting._id}>
            <h2>{new Date(meeting.payload.startTime).toLocaleDateString()}</h2>
            <p>
              {new Date(meeting.payload.startTime).toLocaleTimeString()} -{" "}
              {new Date(meeting.payload.endTime).toLocaleTimeString()}
            </p>
            <p>Meeting Type: {meeting.payload.type}</p>
            <p>Title: {meeting.payload.title}</p>
            <p>Description: {meeting.payload.description}</p>
            <p>Additional Notes: {meeting.payload.additionalNotes}</p>
            <p>Doctor: {meeting.payload.organizer.name}</p>
            <p>Patient: {meeting.payload.attendees[0].name}</p>
            <a href={meeting.payload.videoCallData.url}>Join Meeting</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meetings;
