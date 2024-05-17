/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/LoaderReducer";
import {
  SetAuthenticated,
  SetUnauthenticated,
} from "../../Redux/AuthenticateReducer";
import cookie from "js-cookie";

function Login() {
  const dispatch = useDispatch();
  const navigateto = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      dispatch(ShowLoading());

      const response = await axios.post("http://localhost:4000/login", values);

      dispatch(SetAuthenticated());
      dispatch(HideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast.success("Redirecting to the Home Page");
        localStorage.setItem("token", response.data.data);
        cookie.set("token", response.data.data);
        navigateto("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(SetUnauthenticated());
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 lg:px-0">
        <div className="lg:flex flex-col py-4">
          <div className="flex items-center justify-between font-poppins">
            <div className="font-bold text-2xl">Healio+</div>
            <div>
              <Link to="/">
                <button className="bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold py-2 px-4 text-sm rounded">
                  Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center font-poppins font-bold text-2xl mt-10">
            Login To Your Account
          </h1>
          <div className="bg-white shodow-md flex flex-col justify-center items-center mt-16 rounded-lg w-full max-w-md">
            <form
              className="w-full max-w-sm font-poppins"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="border border-b-4 border-b-[#37BFC4] focus:border focus:border-zinc-500 focus:border-b-4 focus:border-b-[#267c7e]  rounded w-full py-3 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  {...register("email", {
                    required: "Email is required",

                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Email is not Valid",
                    },
                  })}
                />

                {errors.email && (
                  <p className="errorMsg">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className=" border border-b-4 border-b-[#37BFC4] focus:border focus:border-zinc-500 focus:border-b-4 focus:border-b-[#267c7e]  rounded w-full py-3 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />

                {errors.password && (
                  <p className="errorMsg">{errors.password.message}</p>
                )}
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
            <span className=" text-sm lg:text-base text-black mt-4 space-x-10 font-poppins text-center">
              Don't Have an Account?{" "}
              <Link to="/SignUp">
                <span className="text-[#ff7974]">Sign Up Now!</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
