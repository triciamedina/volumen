import React from "react";
import { Link } from "gatsby";
// import facebook from '../img/social/facebook.svg'
// import instagram from '../img/social/instagram.svg'
// import twitter from '../img/social/twitter.svg'

const Footer = () => {
  return (
    <footer className="bg-orange-100 pt-8 pb-16">
      <div className="flex flex-row max-w-6xl mx-auto mt-4">
        <div className="w-1/2 flex flex-col items-center">
          <h6 className="font-bold text-gray-800 mb-4 montserrat text-lg">Company</h6>
          <ul className='text-gray-800 montserrat font-medium'>
            <li>
              {" "}
              <a href="https://volumen.digital/" className="my-2 border-b-2 border-green-500">
                Volumen Digital
              </a>{" "}
            </li>
            <li>
              {" "}
              <Link to="/about" className="py-2">
                About us
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/about" className="py-2">
                Contact
              </Link>{" "}
            </li>
          </ul>
        </div>

        {/* <div className="w-1/2 flex flex-col items-center">
          <h6 className="font-semibold text-gray-700 mb-4">Content</h6>
          <ul>
            <li>
              {" "}
              <a href="" className="text-gray-600 py-2">
                Blog
              </a>{" "}
            </li>
       
          </ul>
        </div> */}
      </div>
    </footer>
  );
};
export default Footer;
