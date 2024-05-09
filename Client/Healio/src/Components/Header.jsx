/* eslint-disable no-unused-vars */
import React from 'react'

function Header() {
  return (
    <>
    <div className="flex flex-col py-4 ml-40 mr-40">
        <div className="flex items-center justify-between font-poppins">
          <div className="font-bold text-2xl">Healio+</div>
          <div className="flex space-x-14">
            <p>Home</p>
            <p>Services</p>
            <p>Find a Doctor</p>
            <p>About Us</p>
          </div>
          <div>
            <button className="bg-[#37BFC4] hover:bg-[#ff7974] text-white font-bold py-2 px-4 text-xl rounded">
              Login
            </button>
          </div>
        </div>
    </div>
    </>
  )
}

export default Header;