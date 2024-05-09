/* eslint-disable no-unused-vars */
import React from "react";
import sign from "../../Assets/Sign.png";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
      <div>
        <div>
          <div className="flex flex-col py-4 ml-40 mr-40">
            <div className="flex items-center justify-between font-poppins">
              <div className="font-bold text-2xl">Healio+</div>
            </div>
            <h1 className="text-center font-poppins font-bold text-2xl ">
              Create an Account
            </h1>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div>
              <img
                src={sign}
                style={{ height: "550px", width: "550px" }}
                className="mt-10 ml-52"
              />
            </div>

            <div className="bg- flex flex-col mt-16 mr-64 rounded-lg">
              <form className="w-full max-w-sm font-poppins">
                <div className="mb-4 mt-2">
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="border border-b-4 border-b-[#37BFC4] rounded w-96 py-3 px-3 text-black focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="border border-b-4 border-b-[#37BFC4] rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="shadow border border-b-4 border-b-[#37BFC4] rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className=" hover:bg-[#319fa1] text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline my-4 border border-b-2 border-[#37BFC4]"
                  >
                    Upload Your Photo
                  </button>
                </div>

                <div className="flex flex-row items-center justify-center">
                  <label>Are you a</label>
                  <p>
                    <input type="radio" className="ml-4" />
                    <span className="ml-2">Doctor</span>
                  </p>
                  <p>
                    <input type="radio" className="ml-4" />
                    <span className="ml-2">Patient</span>
                  </p>
                </div>

                <div className="flex items-center justify-center">
                    <Link to="/">
                    <button
                    type="submit"
                    className="bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4"
                  >
                    Sign Up
                  </button>
                    </Link>

                </div>
              </form>
              <span className="text-black mt-4 space-x-10 font-poppins text-center">
                Already Have an Account? <Link to="/Login"><span className="text-[#ff7974]">Login Now!</span></Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;