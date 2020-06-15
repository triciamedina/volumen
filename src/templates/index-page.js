import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Features from "../components/Features";
import StyleRoll from "../components/StyleRoll";
import IconGrid from '../components/IconGrid'
import Img from "gatsby-image";

export const IndexPageTemplate = ({
  image,
  secondImage,
  title,
  subheading,
  mainpitch,
}) => (
  <div className=''>
    <div id="COLS" className="flex bg-orange-100 pl-40 josefin">
      <div
        id="LEFTCOL"
        className="w-1/2 flex content-center flex-wrap justify-center"
      >
        <div className="w-full">
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
        <Img className="w-full" fluid={secondImage.childImageSharp.fluid}></Img>
      </div>

      <div
        id="RIGHTCOL"
        className="w-1/2 flex content-center flex-wrap justify-center"
      >
        <div className="w-full pr-40">
          <h3 className="text-2xl">{mainpitch.description}</h3>
        </div>
      </div>
    </div>

    <section className="bg-orange-200 flex justify-center">
      <div className="w-3/4 my-16">
        <StyleRoll />
      </div>
    </section>

    <section className="bg-red-200 py-20 px-40">
      <IconGrid/>
    </section>

    <section className="bg-orange-200 flex justify-center">
      <div className="w-full my-16 flex">
        <Features />
      </div>
    </section>

    <section>
      <div></div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  secondImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        secondImage={frontmatter.secondImage}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
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
        secondImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subheading
        mainpitch {
          description
        }
        
      }
    }
  }
`;
