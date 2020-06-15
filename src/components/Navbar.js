import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

const Navbar = () => {
  
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
      className="w-full bg-orange-100 px-40 py-4"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="flex inline">
        <div className="w-1/4 flex justify-start">
          <Link to="/" className="w-full" title="Logo">
            <Img fluid={data.file.childImageSharp.fluid} />
          </Link>
        </div>

        <div className="w-3/4 justify-end text-xl flex text-gray-800 josefin">
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
              <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
