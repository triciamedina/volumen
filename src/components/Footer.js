import React from "react";
import { Link } from "gatsby";
// import facebook from '../img/social/facebook.svg'
// import instagram from '../img/social/instagram.svg'
// import twitter from '../img/social/twitter.svg'

const Footer = () => {
  return (
    <footer className="border-t pb-32">
      <div className="flex flex-row max-w-6xl mx-auto">
        <div className="w-1/2 flex flex-col items-center">
          <h6 className="font-semibold text-gray-700 mb-4">Company</h6>
          <ul>
            <li>
              {" "}
              <a href="https://volumen.digital/" className="text-gray-600 py-2">
                Volumen Digital
              </a>{" "}
            </li>
            <li>
              {" "}
              <Link to="/about" className="text-gray-600 py-2">
                About us
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
