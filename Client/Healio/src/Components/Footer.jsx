/* eslint-disable no-unused-vars */
import React from "react";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="bg-[#37BFC4] py-10 px-8 font-poppins mt-auto">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0 lg:order-2">
          <ul className="flex space-x-5">
            <li>
              <a
                href="/privacy-policy"
                className="text-black hover:text-gray-500"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-of-service"
                className="text-black hover:text-gray-500"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/contact-us" className="text-black hover:text-gray-500">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between lg:order-1">
          <p className="text-black text-sm mb-4 lg:mb-0 lg:mr-4">
            &copy; 2024 Online Medical Consultation. All rights reserved.
          </p>
          <div className="flex items-center justify-center ml-48 space-x-5">
            <p className="text-black text-sm hidden lg:block">
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
    </footer>
  );
};

export default Footer;