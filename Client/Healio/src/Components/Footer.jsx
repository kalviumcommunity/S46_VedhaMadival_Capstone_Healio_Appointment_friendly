/* eslint-disable no-unused-vars */
import React from "react";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../Assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-[#37BFC4] font-poppins">
      <hr className="mb-10 mt-10" />
      <div className="mx-auto flex flex-wrap items-center">
        <div className="w-full md:w-1/4 text-center mb-8 md:mb-0">
          <div className="flex flex-col items-center justify-center">
            <img src={logo} className="h-16 mb-2" />
          </div>
          <h2 className="text-xl font-bold mb-2">Healio</h2>

          <p className="text-gray-800">Healthcare Customized for you : )</p>

          <div className="container mx-auto mt-4 text-gray-500">
            <div className="space-x-5">
              <p className="text-gray-500 text-sm lg:block pb-4">
                Follow us on social media:
              </p>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FontAwesomeIcon icon={faFacebookF} size="2x" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/4 text-center">
          <h4 className="text-lg font-bold mb-2">Product</h4>
          <ul className="list-unstyled text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                About
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-gray-400">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                News
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 text-center">
          <h4 className="text-lg font-bold mb-2">Company</h4>
          <ul className="list-unstyled text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-400">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Media kit
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Resources
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 text-center">
          <h4 className="text-lg font-bold mb-2">Follow us</h4>
          <ul className="list-unstyled text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-400">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Help centre
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 p-2 text-xs text-center text-gray-500">
        &copy; 2024 Online Medical Consultation. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
