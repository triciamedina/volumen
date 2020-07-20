import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
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
    <div className="grid grid-cols-2 md:gap-20 gap-10 max-w-6xl">
      {[
          {Title: "Finance", icon: data.money.childImageSharp.fluid, link: '/tags/finance', description:'How to budget on less resources'},
          {Title: "Social Media", icon: data.phone.childImageSharp.fluid, link: '/tags/social-media', description: 'how to get ahead of the game in this economy'},
          {Title: "E-commerce", icon: data.store.childImageSharp.fluid, link: '/tags/e-commerce', description:'Shifting from retail to the digital marketplace'},
          {Title: "Adaptation", icon: data.computer.childImageSharp.fluid, link: '/tags/adaptation', description:'Inspo to change and improve your business model'},
        ].map(
        (name) => (
          <div
            className="bg-white flex flex-col shadow-lg rounded-lg text-center py-8"
            key={name.Title}
          >
            <Img className='w-1/3 mx-auto' fluid={name.icon} />
            <Link className="md:text-4xl text-2xl josefin text-blue-500" to={name.link}>{name.Title}</Link>
            <p>{name.description}</p>
          </div>
        )
      )}
    </div>
  );
};
export default IconGrid;
