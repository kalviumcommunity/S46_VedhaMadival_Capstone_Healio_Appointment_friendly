import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetAuthenticated, SetUnauthenticated } from "../Redux/AuthenticateReducer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import user from "../Assets/user-account.png";

function Header() {
  // const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state) => state.isAuthenticated);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     dispatch(SetAuthenticated());
  //   }
  // });

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 lg:px-0">
        <div className="flex flex-col py-4">
          <div className="flex items-center justify-between font-poppins">
            <div className="font-bold text-2xl">Healio+</div>

            
            <div className="hidden lg:flex space-x-14">
              <Link to="/">
                <p className="cursor-pointer">Home</p>
              </Link>
              <Link to="/Services">
                <p className="cursor-pointer">Services</p>
              </Link>
              <Link to="/Consult">
              <p className="cursor-pointer">Consult Here</p>
              </Link>

              <p className="cursor-pointer">About Us</p>
            </div>
            <div className="flex flex-row">

{/* 
              {isAuthenticated ? (
                <div className="flex flex-row">
                  <Link to="/Profile">
                    <div>
                      <button className="text-white font-bold py-2 px-4 text-xl rounded">
                        <img src={user} style={{ height: "35px" }} />
                      </button>
                    
                    </div>
                  </Link>
                </div>
              ) : ( */}
                <Link to="/Login">
                  <div>
                    <button className="bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold py-2 px-4 text-xl rounded">
                      Login
                    </button>
                  </div>
                </Link>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
