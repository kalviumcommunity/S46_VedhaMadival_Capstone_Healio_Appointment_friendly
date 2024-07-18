/* eslint-disable react/prop-types */
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/LoaderReducer";
import { setDoctorData } from "../../Redux/DoctorInfoReducer";
import cookie from "js-cookie"

function Book() {
  const { doctorId } = useParams();
  const doctorData = useSelector((state) => state.DoctorData.DoctorData);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axios.get(
          `https://s46-vedhamadival-capstone-healio.onrender.com/get-doctor-by-id/${doctorId}`,
          {
            headers: {
              Authorization: "Bearer " + cookie.get("token"),
            },
          }
        );
        dispatch(setDoctorData(response.data.data));
        dispatch(HideLoading());
      } catch (error) {
        console.log(error.message);
        dispatch(HideLoading());
      }
    };

    fetchData();
  }, [doctorId, dispatch]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 lg:px-0">
      <div className="flex flex-col py-6">
        <div className="font-poppins">
          <div className="font-bold text-3xl mb-6">Healio+</div>
          <div>
            {doctorData ? (
              <div>
                <h1 className="text-lg font-bold py-4">
                  <u>Selected Doctor Profile</u>
                </h1>
                <div className="text-2xl font-bold py-4">
                  Dr. {doctorData.firstname} {doctorData.lastname}
                </div>
                <div className="py-2">
                  <strong>Specialized In: </strong>
                  {doctorData.specialization}
                </div>
                <div className="py-2">
                  <strong>Experienced for: </strong>
                  {doctorData.experience} year
                </div>
                <div className="py-2 mb-10">
                  <strong>Fees Taken Per Consultation: </strong>
                  {doctorData.feePerConsultation}
                </div>
                <div className="flex justify-around">
                  <div>
                    {doctorData.calEventypeLink && (
                      <div className="flex flex-row items-center justify-center">
                        <a
                          href={`${doctorData.calEventypeLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="px-4 py-2 bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold rounded">
                            Book Online Consultation
                          </button>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>No doctor data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
