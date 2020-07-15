import React, { useState } from 'react';
import { Link, graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import { HamburgerSqueeze } from 'react-animated-burgers';


const Navbar = () => {
  const [isActive, toggleButton] = useState(false);

  
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "Logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <nav
      className="w-full bg-orange-100 px-8 py-2"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="flex justify-between max-w-6xl mx-auto">
        <div className="md:w-1/4 w-3/4 flex justify-start pt-4">
          <Link to="/" className="w-full" title="Logo">
            <Img fluid={data.file.childImageSharp.fluid} />
          </Link>
        </div>
        <div className='block md:hidden flex rounded-none justify-end pt-4'>
            <HamburgerSqueeze
              className='z-20 p-0 straight'
              buttonStyle={{ padding: '0px' }}
              isActive={isActive}
              onClick={() => toggleButton(!isActive)}
              barColor={!isActive ? '#2D3748' : '#FFFFFF'}
            />
          </div>

        <div className="w-3/4 justify-end text-xl hidden md:flex text-gray-800 lato pt-4">
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
            <Link className="" to="/library">
              <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div
        className={`${isActive? `true` : `false`} fixed bg-gray-800 h-screen w-1/2 flex flex-col right-0 md:hidden lg:hidden z-10`}
        id='SideMenu'
      >
        <ul className='flex-col mt-16'>
          {[
            { title: 'Home', route: '/' },
            { title: 'About', route: '/about' },
            { title: 'Library', route: '/library' },
            { title: 'Get Started', route: '/library' }
          ].map(navigationItem => (
            <li
              className='mt-3 md:mt-0 md:ml-6'
              key={navigationItem.title + 'side'}
            >
              <Link
              activeClassName='font-bold'
                to={navigationItem.route}
                onClick={() => toggleButton(!isActive)}
              >
                <p className=' text-white block ml-4 text-2xl'>
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
