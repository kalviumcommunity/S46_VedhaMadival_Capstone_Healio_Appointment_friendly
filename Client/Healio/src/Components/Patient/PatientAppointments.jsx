import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../Redux/LoaderReducer';
import meet from "../../Assets/meet.png";

function DoctorConsultations() {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [filter, setFilter] = useState('all');
  const { userData: data } = useSelector((state) => state.userData);
  const userId = data._id;
  const [email, setEmail] = useState('');
  console.log(email)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://s46-vedhamadival-capstone-healio.onrender.com/get-patient-details', {
          headers: {
            Authorization: 'Bearer ' + cookie.get('token'),
          },
          params: { userId },
        });
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
        const response = await axios.get(`https://s46-vedhamadival-capstone-healio.onrender.com/api/meetings/patient/${email}`, {
          headers: {
            Authorization: 'Bearer ' + cookie.get('token'),
          },
        });
        setMeetings(response.data);
        console.log(response.data);
        setFilteredMeetings(response.data); 
        dispatch(HideLoading());
      } catch (error) {
        console.error('Error fetching patient meetings:', error);
        dispatch(HideLoading());
      }
    };
    fetchMeetings();
  }, [email, dispatch]);

  useEffect(() => {
    filterMeetings();
  }, [filter, meetings]);

  const filterMeetings = () => {
    switch (filter) {
      case 'upcoming':
        setFilteredMeetings(meetings.filter(meeting => new Date(meeting.payload.startTime) >= new Date()));
        break;
      case 'completed':
        setFilteredMeetings(meetings.filter(meeting => new Date(meeting.payload.endTime) < new Date()));
        break;
      case 'rescheduled':
        setFilteredMeetings(meetings.filter(meeting => meeting.event === 'BOOKING_RESCHEDULED'));
        break;
      case 'cancelled':
        setFilteredMeetings(meetings.filter(meeting => meeting.event === 'BOOKING_CANCELLED'));
        break;
      default:
        setFilteredMeetings(meetings);
        break;
    }
  };

  const handleTabClick = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <div className="p-2 border border-slate-500 h-[80%] mt-6 mr-4 rounded-lg">
        <h1 className="text-2xl font-bold font-poppins mb-4 p-2">Patient Consultations</h1>
        <div className="flex space-x-4">
          <Tab label="All" active={filter === 'all'} onClick={() => handleTabClick('all')} />
          <Tab
            label="Upcoming"
            active={filter === 'upcoming'}
            onClick={() => handleTabClick('upcoming')}
          />
          <Tab
            label="Rescheduled"
            active={filter === 'rescheduled'}
            onClick={() => handleTabClick('rescheduled')}
          />
          <Tab
            label="Completed"
            active={filter === 'completed'}
            onClick={() => handleTabClick('completed')}
          />
          <Tab
            label="Cancelled"
            active={filter === 'cancelled'}
            onClick={() => handleTabClick('cancelled')}
          />
        </div>
        <div className="mt-4">
        {filteredMeetings &&
            filteredMeetings.map((meeting) => (
              <div
                key={meeting._id}
                className="flex justify-start items-center font-poppins border border-slate-500 rounded-lg p-6 mb-4"
              >
                <div>
                  <h2 className="">
                    {new Date(meeting.payload.startTime).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </h2>
                  <p className="">
                    {new Date(meeting.payload.startTime).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit", hour12: true }
                    )}{" "}
                    -{" "}
                    {new Date(meeting.payload.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>

                  <div className="flex justify-start items-center">
                    <div>
                      <img src={meet} className="h-4" />
                    </div>
                    <div className="ml-2">
                      <a
                        href={meeting.payload.metadata.videoCallUrl}
                        className="text-blue-500 hover:text-blue-80"
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  <p className="font-semibold text-lg w-[100%]">
                    {meeting.payload.title}
                  </p>
                  <p>
                    <span className="font-bold"> Doctor Name :</span>{" "}
                    {meeting.payload.organizer.name}
                  </p>
                  <p>
                    <span className="font-bold">
                      {" "}
                      Your Additional Note :
                    </span>{" "}
                    {meeting.payload.additionalNotes}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const Tab = ({ label, active, onClick }) => {
  return (
    <button
      className={`py-2 px-4 rounded-lg font-poppins ${
        active ? 'bg-[#267c7e] text-white' : 'bg-gray-300 text-gray-900'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default DoctorConsultations;
