import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
// import FeaturedRoll from "../components/FeaturedRoll";
import LibraryRoll from "../components/LibraryRoll";
import StyleRoll from "../components/StyleRoll";
import Img from "gatsby-image";

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  // intro,
}) => (
  <div>
    <div id="COLS" className="flex bg-orange-200 josefin">
      <div
        id="LEFTCOL"
        className="w-1/2 flex content-center flex-wrap justify-center"
      >
        <div className="w-10/12">
          <h1 className="text-6xl leading-tight">{title}</h1>
          <h3 className="text-2xl">{subheading}</h3>
        </div>
      </div>
      <div id="RIGHTCOL" className="w-1/2 flex justify-end">
        <Img className="w-10/12" fluid={image.childImageSharp.fluid}></Img>
      </div>
    </div>

    <div id="PINK" className="flex bg-red-200 josefin">
      <div id="LEFTCOL" className="w-1/2 flex justify-center">
        <Img className="w-1/2" fluid={image.childImageSharp.fluid}></Img>
      </div>

      <div
        id="RIGHTCOL"
        className="w-1/2 flex content-center flex-wrap justify-center"
      >
        <div className="w-10/12">
          <h3 className="text-3xl">{mainpitch.description}</h3>
        </div>
      </div>
    </div>

    <section className="bg-orange-200 flex justify-center">
      <div className="w-3/4 my-16">
        <LibraryRoll />
      </div>
    </section>

    <section className="bg-red-200 p-20">
      <div className="grid grid-cols-2 gap-20">
        {["Business Loans", "Social Media", "E-Commerce", "Adaptation"].map(
          (name) => (
            <div
              className="bg-white flex flex-col shadow-lg text-center"
              key={name}
            >
              <h1 className="text-2xl">{name}</h1>
              <p>Description of category here</p>
            </div>
          )
        )}
      </div>
    </section>

    <section className="bg-orange-200 flex justify-center">
      <div className="w-3/4 my-16">
        <StyleRoll />
      </div>
    </section>

    <section>
      <div></div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
