import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

const IconGrid = () => {

  const data = useStaticQuery(graphql`
    query {
      money: file(relativePath: { eq: "moneyIcon.png" }) {
      ...icon
      }
    
      computer: file(relativePath: { eq: "computerIcon.png" }) {
      ...icon
      }
    
      phone: file(relativePath: { eq: "phoneIcon.png" }) {
      ...icon
      }
    
      store: file(relativePath: { eq: "storeIcon.png" }) {
      ...icon
      }
    }

  `);
  return (
    <div className="grid grid-cols-2 gap-20">
      {[
          {Title: "Finance", icon: data.money.childImageSharp.fluid, link: '/tags/finance'},
          {Title: "Social Media", icon: data.phone.childImageSharp.fluid, link: '/tags/social-media'},
          {Title: "E-commerce", icon: data.store.childImageSharp.fluid, link: '/tags/e-commerce'},
          {Title: "Adaptation", icon: data.computer.childImageSharp.fluid, link: '/tags/adaptation'},
        ].map(
        (name) => (
          <div
            className="bg-white flex flex-col shadow-lg rounded-lg text-center py-8"
            key={name.Title}
          >
            <Img className='w-1/3 mx-auto' fluid={name.icon} />
            <h1 className="text-4xl josefin text-gray-900">{name.Title}</h1>
            <p>Description of category here</p>
          </div>
        )
      )}
    </div>
  );
};
export default IconGrid;
