/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div>
        <div>
          <div className="flex flex-col py-4 ml-40 mr-40">
            <div className="flex items-center justify-between font-poppins">
              <div className="font-bold text-2xl">Healio+</div>
              <div>
                <Link to="/SignUp">
                  <button className="bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold py-2 px-4 text-xl rounded">
                    SignUp
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center font-poppins font-bold text-2xl mt-10">
              Login To Your Account
            </h1>
            <div className="bg- flex flex-col mt-16 rounded-lg">
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
                    className="bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4"
                  >
                    Login
                  </button>
                </div>
              </form>
              <span className="text-black mt-4 space-x-10 font-poppins text-center">
                Don't Have an Account?{" "}
                <Link to="/SignUp">
                  <span className="text-[#ff7974]">Sign Up Now!</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;