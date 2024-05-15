/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import img from "../Assets/img.png";
import doc from "../Assets/Finddoc.png";
import arrow from "../Assets/right-arrow.png";
import book from "../Assets/Bookdoc.png";
import con from "../Assets/Consultdoc.png";
import care from "../Assets/care.png";
import best from "../Assets/best.png";
import Footer from "./Footer";
import axios from "axios";
import Header from "./Header";

function Home() {
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 lg:px-0">
        {/* Header */}
        <Header />
        {/* Info part1 */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="py-4 mt-8 lg:mt-16 lg:w-2/3">
            <h1 className="text-[#37BFC4] text-5xl lg:text-8xl font-bold font-poppins">
              Medical Specialities
            </h1>
            <p className="text-xl lg:text-3xl font-bold font-poppins pt-2 mt-6">
              FOR EVERY NEED
            </p>
            <p className="text-base lg:text-lg font-poppins font-thin pt-2 mt-6">
              Whether you're seeking routine check-ups, specialized treatments,
              or emergency care, our dedicated team of healthcare professionals
              is here to serve you with compassion, expertise, and excellence.
            </p>

            <div className="flex justify-center lg:hidden">
              <img
                src={img}
                className="w-full lg:w-auto"
                alt="Medical Specialties"
              />
            </div>

            <button className="bg-[#37BFC4] text-white font-bold py-2 px-4 mt-8 rounded text-center w-full lg:w-80 h-12 font-poppins hover:bg-[#ff7974]">
              Book Your Appointment
            </button>
          </div>

          <div className=" hidden lg:flex justify-center ">
            <img
              src={img}
              style={{ height: 500, width: 500 }}
              alt="Medical Specialties"
            />
          </div>
        </div>

        {/* Info part2 */}
        <div className="mt-24 h-full">
          <p className="text-3xl lg:text-4xl text-center font-bold font-poppins mb-8">
            Three Steps to Wellness: simple actions, ensuring comprehensive care
          </p>

          <div className="flex flex-col lg:flex-row justify-between space-y-12 lg:space-y-0 lg:space-x-12">
            {/* Step 1 */}
            <div className="bg-white w-full lg:w-[30%] flex flex-col items-center justify-center shadow-inner drop-shadow-lg rounded-xl">
              <img
                src={doc}
                className="mt-10 mb-6 rounded-lg"
                style={{ height: 200, width: 200 }}
                alt="Find a Doctor"
              />
              <h1 className="font-bold font-poppins text-xl">Find a Doctor</h1>
              <p className="hidden lg:mx-4 lg:block text-center font-thin font-poppins text-base mt-2">
                You Search a specialty to find your list of doctors and select
                any one doctor preferred by your choice.
              </p>
              <button className="my-4 p-2 border rounded-full transition-colors duration-200 hover:bg-[#37BFC4]">
                <img
                  src={arrow}
                  style={{ height: 30, width: 30 }}
                  alt="Arrow"
                />
              </button>
            </div>

            {/* Step 2 */}
            <div className="bg-white w-full lg:w-[30%] flex flex-col items-center justify-center shadow-inner drop-shadow-lg rounded-xl">
              <img
                src={book}
                className="mt-10 mb-6 rounded-lg"
                style={{ height: 200, width: 200 }}
                alt="Book an Appointment"
              />
              <h1 className="font-bold font-poppins text-xl">
                Book an Appointment
              </h1>
              <p className="hidden lg:mx-4 lg:block text-center font-thin font-poppins text-base mt-2">
                Choose a slot according to your timeline and select the slot of
                a chosen doctor get an approval email.
              </p>
              <button className="my-4 p-2 border rounded-full transition-colors duration-200 hover:bg-[#37BFC4]">
                <img
                  src={arrow}
                  style={{ height: 30, width: 30 }}
                  alt="Arrow"
                />
              </button>
            </div>

            {/* Step 3 */}
            <div className="bg-white w-full lg:w-[30%] flex flex-col items-center justify-center shadow-inner drop-shadow-lg rounded-xl">
              <img
                src={con}
                className="mt-10 mb-6 rounded-lg"
                style={{ height: 200, width: 200 }}
                alt="Consultation Done"
              />
              <h1 className="font-bold font-poppins text-xl">
                Consultation Done!
              </h1>
              <p className="hidden lg:mx-4 lg:block text-center font-thin font-poppins text-base mt-2">
                Attend the Consultation at the booked time slot. Go through the
                process, complete the payment, and you're done.
              </p>
              <button className="my-4 p-2 border rounded-full transition-colors duration-200 hover:bg-[#37BFC4]">
                <img
                  src={arrow}
                  style={{ height: 30, width: 30 }}
                  alt="Arrow"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <div className=" hidden lg:flex items-center justify-between p-12">
          <div className="w-full lg:w-2/5 text-left">
            <h1 className="font-poppins font-bold text-3xl lg:mb-12">
              Experience Personalized Care
            </h1>
            <p className="font-poppins font-extralight">
              With a focus on patient-centered care, we strive to create a
              supportive and compassionate environment where every individual
              feels valued and respected. Our team of experienced medical
              professionals is dedicated to providing comprehensive and
              cutting-edge treatments across a wide range of specialties. From
              preventative care to complex procedures, we are here to meet your
              healthcare needs with excellence and integrity.
            </p>
          </div>

          <div className="flex flex-col">
            <img
              src={best}
              className="rounded-lg"
              style={{ height: "400px", width: "600px" }}
              alt="Experience Personalized Care"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="hidden lg:flex items-center justify-between p-12">
          <div className="flex flex-col ">
            <img
              src={care}
              className="rounded-lg"
              style={{ height: "400px", width: "600px" }}
              alt="Nation's Best Doctors Here"
            />
          </div>

          <div className="w-full lg:w-2/5 text-right">
            <h1 className="font-poppins font-bold text-3xl lg:mb-12">
              Nation's Best Doctors Here
            </h1>
            <p className="font-poppins font-extralight">
              Our doctors are leaders in their specialties, continually
              advancing their knowledge and skills to stay at the forefront of
              medical innovation. They are committed to delivering the highest
              standard of care, utilizing the latest medical technologies and
              evidence-based practices to ensure optimal outcomes for our
              patients. When you choose our hospital, you can trust that you are
              in the hands of the best doctors who are committed to your
              well-being and dedicated to providing exceptional care at every
              encounter.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
