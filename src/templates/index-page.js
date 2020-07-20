import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Features from "../components/Features";
import StyleRoll from "../components/StyleRoll";
import IconGrid from "../components/IconGrid";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const IndexPageTemplate = ({
  image,
  secondImage,
  title,
  subheading,
  mainpitch,
}) => (
  <div className="bg-orange-100 w-full">
    <div
      id="COLS"
      className="max-w-6xl mx-auto flex md:flex-row flex-col bg-orange-100 curvy py-12 px-8"
    >
      <div
        id="LEFTCOL"
        className="md:w-1/2 w-full flex flex-wrap md:pr-8 self-center"
      >
        <div className="w-full flex flex-col">
          <h1 className="text-5xl leading-tight mb-8 italic font-black">
            {title}
          </h1>
          <h2 className="xl:text-3xl md:text-2xl text-xl lato">{subheading}</h2>
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

    <div
      id="PINK"
      className="w-full  bg-red-100 lato py-8"
    >
      <div id="PINKCOLS" className='mx-auto max-w-6xl flex md:flex-row flex-col'>
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
          <div className="w-full px-8">
            <h2 className="xl:text-3xl md:text-2xl text-xl">
              {mainpitch.description}
            </h2>
          </div>
        </div>
      </div>
    </div>

    <section className="bg-orange-100 flex justify-center">
      <div className="px-8 w-full my-16">
        <StyleRoll />
      </div>
    </section>

    <section className="bg-red-200 py-20 lg:px-40 px-8">
      <IconGrid />
    </section>

    <section className="bg-orange-200 w-full py-16 px-8">
      <div className="mx-auto">
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
