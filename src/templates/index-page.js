import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Features from "../components/Features";
import IconGrid from "../components/IconGrid";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const IndexPageTemplate = ({
  image,
  secondImage,
  title,
  subheading,
  mainpitch,
}) => (
  <div className="bg-white w-full">
    <div
      id="COLS"
      className="max-w-6xl mx-auto flex md:flex-row flex-col-reverse bg-white font-curvy py-12 px-6"
    >
      <div
        id="LEFTCOL"
        className="md:w-1/2 w-full flex flex-wrap md:pr-8 self-center"
      >
        <div className="w-full flex flex-col text-center md:text-left">
          <h1 className="text-4xl leading-tight italic font-extrabold text-gray-900">
            {title}
          </h1>
          <h2 className="text-xl font-straight font-medium">{subheading}</h2>
        </div>
      </div>
      <div id="RIGHTCOL" className="md:w-1/2 w-full flex self-center">
        <div className="w-full">
          <PreviewCompatibleImage
            imageInfo={{
              image: image,
              alt: `featured image thumbnail for post`,
            }}
          />
        </div>
      </div>
    </div>

    <div className="w-full bg-gray-200 font-straight py-8">
      <div className="mx-auto max-w-6xl flex md:flex-row flex-col">
        <div id="LEFTCOL" className="md:w-1/2 w-full flex justify-start">
          <div className="w-full">
            <PreviewCompatibleImage
              imageInfo={{
                image: secondImage,
                alt: `featured image thumbnail for post`,
              }}
            />
          </div>
        </div>

        <div
          id="RIGHTCOL"
          className="md:w-1/2 w-full flex content-center flex-wrap justify-end"
        >
          <div className="w-full px-6">
            <h2 className="text-xl font-straight font-medium">
              {mainpitch.description}
            </h2>
          </div>
        </div>
      </div>
    </div>

    <section className="bg-gray-200 py-20 lg:px-40 px-6">
      <IconGrid />
    </section>

    <section className="bg-gray-200 w-full py-16 px-6">
      <div className="">
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
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        secondImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
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
