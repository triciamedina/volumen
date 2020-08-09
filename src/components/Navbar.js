import React, { useState } from "react";
import { Link } from "gatsby";
import Hamburger from "hamburger-react";

const Navbar = () => {
  const [isActive, toggleButton] = useState(false);

  return (
    <nav
      className="w-full bg-white shadow"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="flex justify-between max-w-6xl mx-auto px-6">
        <div className="lg:w-1/4 md:w-1/3 w-1/2 flex justify-start pt-4">
          <Link to="/" className="w-full" title="Logo">
            <span className="font-straight text-3xl font-black text-green-600">
              Amplifica!
            </span>
          </Link>
        </div>
        <div className="block md:hidden flex rounded-none">
          <div
            id="burger-wrapper"
            className={`z-20 ${isActive ? `true` : `false`}`}
          >
            <Hamburger
              toggle={() => toggleButton(!isActive)}
              toggled={isActive}
              aria-label="Menu button"
            />
          </div>
        </div>

        <div className="w-3/4 justify-end text-xl hidden md:flex text-gray-800 font-straight pt-4">
          <div className="inline-block">
            <Link className="mr-6" to="/">
              Home
            </Link>
            <Link className="mr-6" to="/about">
              About
            </Link>
            <Link className="mr-6" to="/library">
              Library
            </Link>
            <Link className="mr-6" to="/directory">
              Directory
            </Link>
            <Link className="" to="/library">
              <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div
          className={`${
            isActive ? `true` : `false`
          } fixed bg-green-900 h-screen w-1/2 flex flex-col right-0 md:hidden lg:hidden z-10`}
          id="SideMenu"
        >
          <ul className="flex-col mt-16 font-straight">
            {[
              { title: "Home", route: "/" },
              { title: "About", route: "/about" },
              { title: "Library", route: "/library" },
              { title: "Directory", route: "/directory" },
              { title: "Get Started", route: "/library" },
            ].map((navigationItem) => (
              <li
                className="mt-3 md:mt-0 md:ml-6"
                key={navigationItem.title + "side"}
              >
                <Link
                  activeClassName="font-bold font-straight"
                  to={navigationItem.route}
                  onClick={() => toggleButton(!isActive)}
                >
                  <p className=" text-white block ml-4 text-2xl">
                    {navigationItem.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
