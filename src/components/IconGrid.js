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
    <div className="flex flex-wrap max-w-6xl justify-between">
      <h3 className="text-3xl montserrat font-semibold">
        Select a category below to find relevant resources.
      </h3>
      {[
        {
          Title: "Finance",
          icon: data.money.childImageSharp.fluid,
          link: "/tags/finance",
          description: "How to budget on less resources",
        },
        {
          Title: "Social Media",
          icon: data.phone.childImageSharp.fluid,
          link: "/tags/social-media",
          description: "How to get ahead of the game in this economy",
        },
        {
          Title: "E-commerce",
          icon: data.store.childImageSharp.fluid,
          link: "/tags/e-commerce",
          description: "Shifting from retail to the digital marketplace",
        },
        {
          Title: "Adaptation",
          icon: data.computer.childImageSharp.fluid,
          link: "/tags/adaptation",
          description: "Inspo to improve your business model",
        },
      ].map((name) => (
        <div className="w-1/2">
          <div
            className="bg-white flex flex-col flex-no-wrap shadow-lg rounded-lg text-center py-8 px-4 m-4"
            key={name.Title}
          >
            <Link to={name.link}>
              <Img className="w-1/2 md:w-1/3 mx-auto" fluid={name.icon} />
              <p className="md:text-4xl text-2xl josefin text-blue-500">
                {name.Title}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default IconGrid;
