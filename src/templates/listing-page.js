import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby"; 
import { Link } from "@reach/router";
import { kebabCase, startCase } from 'lodash';

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import "../components/tailwind.css";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Carousel from '../components/Carousel';

export const ListingPageTemplate = ({
        content,
        contentComponent,
        title,
        region,
        county,
        city,
        type,
        helmet,
        industry,
        streetAddress,
        state,
        zip,
        addressLink,
        tel,
        website,
        featuredVideos,
        featuredImages,
        mapCaption,
        supportingImage,
        supportingImageCaption
    }) => {

    const PostContent = contentComponent || Content;
    const addressQuery = startCase(`${streetAddress} ${city} ${state} ${zip}`);
    const mapLink = addressLink || `https://www.google.com/maps/search/?api=1&query=${encodeURI(addressQuery)}`;
    const carouselContent = [...featuredVideos, ...featuredImages];

    return (
        <main className="ListingPage flex flex-col max-w-6xl mx-auto px-6 lg:px-12">
            {helmet || ""}

            <header className="mb-8">
              <Link 
                  to={`/directory/browse/${kebabCase(region)}/${kebabCase(county)}/${kebabCase(city)}`}
                  className="inline-block my-4 border-b-2 border-green-500 text-gray-800 font-straight font-medium"
                  state={{ isOpen: type }}
              >
                  Back
              </Link>
              <h1 className="font-straight font-black text-4xl text-gray-900">
                  {title}
              </h1>
              <p className="text-lg">
                  {`${startCase(region[0])} > ${startCase(county[0])} > ${startCase(city[0])}`} 
              </p>
            </header>

            <div className="flex flex-col lg:flex-row lg:mb-12">

              <div className="left-col relative mb-8 lg:mb-0">
                <Carousel content={ carouselContent || []} />
              </div>

              <div className="right-col p-8 bg-gray-200">
                <address>
                  <ul className="text-lg markdown">
                    <li className="mb-6">
                      <h3 className="font-curvy font-semibold">Industry</h3>
                      <ul>
                        {industry.map((category, index) => <li key={index}>{category}</li>)}
                      </ul>
                    </li>
                    {streetAddress ? (
                      <li className="mb-6">
                        <h3 className="font-curvy font-semibold">Address</h3>
                        <a href={mapLink} target="_blank" rel="noopener noreferrer">{streetAddress}</a>
                      </li>
                    ): null}
                    {tel ? (
                      <li className="mb-6">
                        <h3 className="font-curvy font-semibold">Phone</h3>
                        <a href={`tel:${tel}`}>{tel}</a>
                      </li>
                    ): null}
                    {website ? (
                      <li className="mb-6">
                        <h3 className="font-curvy font-semibold">Website</h3>
                        <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                      </li>
                    ) : null}
                  </ul>
                </address>
              </div>

            </div>
            
            <div className="flex flex-col lg:flex-row lg:mb-12">

              <div className="left-col">
                <section className="text-lg leading-relaxed markdown pr-4">
                  <PostContent
                    content={content}
                  />
                </section>
              </div>

              <div className="right-col">
                <aside className="lg:my-4">
                  {streetAddress ? (
                    <div className="container--4-3">
                      <iframe
                        frameBorder="0"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA7Mb0Z1JfurKePCoq_Facnv68pWG-EP1k&q=${addressQuery}`}
                        allowFullScreen
                        className="map"
                        title="Map"
                      ></iframe>
                    </div>
                  ) : null}
                  {mapCaption ? (
                    <div className="mb-12">
                      <p className="text-sm px-8 pt-4">
                        {mapCaption}
                      </p>
                    </div>
                  ) : null}
                  {supportingImage ? (
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: supportingImage,
                        alt: '',
                      }}
                    />
                  ) : null}
                  {supportingImageCaption ? (
                    <div className="mb-12">
                      <p className="text-sm px-8 pt-4">
                        {supportingImageCaption}
                      </p>
                    </div>
                  ) : null}
                </aside>
              </div>

            </div>

        </main>
    )
};

const Listing = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ListingPageTemplate
        helmet={
          <Helmet titleTemplate="%s | Directory">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        region={post.frontmatter.region}
        county={post.frontmatter.county}
        city={post.frontmatter.city}
        type={post.frontmatter.type}
        industry={post.frontmatter.industry}
        streetAddress={post.frontmatter.streetAddress}
        state={post.frontmatter.state}
        zip={post.frontmatter.zip}
        addressLink={post.frontmatter.addressLink}
        tel={post.frontmatter.tel}
        website={post.frontmatter.website}
        featuredVideos={post.frontmatter.featuredVideos}
        featuredImages={post.frontmatter.featuredImages}
        mapCaption={post.frontmatter.mapCaption}
        supportingImage={post.frontmatter.supportingImage}
        supportingImageCaption={post.frontmatter.supportingImageCaption}
      />
    </Layout>
  );
};

export default Listing;

export const pageQuery = graphql`
  query ListingByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        region
        county
        city
        type
        industry
        streetAddress
        addressLink
        state
        zip
        tel
        website
        featuredVideos
        featuredImages {
          childImageSharp {
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mapCaption
        supportingImage {
          childImageSharp {
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        supportingImageCaption
      }
    }
  }
`;