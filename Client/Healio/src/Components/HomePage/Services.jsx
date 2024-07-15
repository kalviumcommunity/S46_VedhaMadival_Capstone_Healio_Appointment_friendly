import React, { useEffect } from "react";
import Header from ".././HomePage/Header";
import neuro from "../../Assets/Neurology.png";
import arrow from "../../Assets/right-arrow.png";
import naturo from "../../Assets/Naturo.png";
import cancer from "../../Assets/Cancer.png";
import derma from "../../Assets/Derma.png";
import gynac from "../../Assets/Gynaecology.png";
import mind from "../../Assets/Mental.png";
import Footer from ".././HomePage/Footer";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/LoaderReducer";
import toast from "react-hot-toast";

function Services() {
  return (
    <>
      <div className="mx-auto mt-4 max-w-screen-xl px-4 mb-28">
        <Header />
        <div className="text-3xl font-poppins mt-10 text-center mb-20">
          Our Medical Services
        </div>

        <div className="grid gap:10 lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Neurology */}
          <div className="bg-[#37BFC4] h-60 w-fit border rounded-lg justify-self-center">
            <img src={neuro} className="h-48 w-72 rounded-t-lg " />

            <div className="flex flex-row justify-between">
              <div>
                <p className="text-white text-lg font-poppins p-2">Neurology</p>
              </div>
              <div className="p-2">
                <button className="p-2 border border-white rounded-full transition-colors duration-200 hover:bg-white">
                  <img src={arrow} className="h-4" alt="Arrow" />
                </button>
              </div>
            </div>
          </div>

          {/* Cancer Care */}
          <div className="bg-[#37BFC4] h-60 w-fit border rounded-lg justify-self-center">
            <img src={cancer} className="h-48 w-72 rounded-t-lg" />

            <div className="flex flex-row justify-between">
              <div>
                <p className="text-white text-lg font-poppins p-2">
                  Cancer Care
                </p>
              </div>
              <div className="p-2">
                <button className="p-2 border rounded-full transition-colors duration-200 hover:bg-white">
                  <img src={arrow} className="h-4" alt="Arrow" />
                </button>
              </div>
            </div>
          </div>

          {/* Naturopathy */}
          <div className="bg-[#37BFC4] h-60 w-fit border rounded-lg justify-self-center">
            <img src={naturo} className="h-48 w-72 rounded-t-lg" />

            <div className="flex flex-row justify-between">
              <div>
                <p className="text-white text-lg font-poppins p-2">
                  Naturopathy
                </p>
              </div>
              <div className="p-2">
                <button className="p-2 border rounded-full transition-colors duration-200 hover:bg-white">
                  <img src={arrow} className="h-4" alt="Arrow" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#37BFC4] h-60 w-fit border rounded-lg justify-self-center">
            <img src={derma} className="h-48 w-72 rounded-t-lg" />

            <div className="flex flex-row justify-between">
              <div>
                <p className="text-white text-lg font-poppins p-2">
                  Dermatology
                </p>
              </div>
              <div className="p-2">
                <button className="p-2 border rounded-full transition-colors duration-200 hover:bg-white">
                  <img src={arrow} className="h-4" alt="Arrow" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#37BFC4] h-60 w-fit border rounded-lg justify-self-center">
            <img src={gynac} className="h-48 w-72 rounded-t-lg" />

            <div className="flex flex-row justify-between">
              <div>
                <p className="text-white text-lg font-poppins p-2">
                  Gynaecology
                </p>
              </div>
              <div className="p-2">
                <button className="p-2 border rounded-full transition-colors duration-200 hover:bg-white">
                  <img src={arrow} className="h-4" alt="Arrow" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#37BFC4] h-60 w-fit border rounded-lg justify-self-center">
            <img src={mind} className="h-48 w-72 rounded-t-lg" />

            <div className="flex flex-row justify-between">
              <div>
                <p className="text-white text-lg font-poppins p-2">
                  Mental Health
                </p>
              </div>
              <div className="p-2">
                <button className="p-2 border rounded-full transition-colors duration-200 hover:bg-white">
                  <img src={arrow} className="h-4" alt="Arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;
