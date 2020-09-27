import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby"; 
import { Link } from "@reach/router";
import { startCase } from 'lodash';

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import "../components/tailwind.css"

export const ListingPageTemplate = ({
        content,
        contentComponent,
        title,
        description,
        metroArea,
        county,
        region,
        type,
        helmet,
        industry,
        streetAddress,
        city,
        state,
        zip,
        addressLink,
        tel,
        website
    }) => {

    const PostContent = contentComponent || Content;
    const mapLink = addressLink || `https://www.google.com/maps/search/?api=1&query=${encodeURI(`${streetAddress} ${city} ${state} ${zip}`)}`;

    return (
        <section className="ListingPage max-w-6xl mx-auto">
            {helmet || ""}
            <div className="flex-1 p-6 overflow-scroll">
                <Link 
                    to={`/directory/browse/${metroArea}/${county}/${region}`}
                    className="inline-block my-4 border-b-2 border-green-500 text-gray-800 font-straight font-medium"
                    state={{ isOpen: type }}
                >
                    Back
                </Link>
                <h2 className="font-straight font-black text-4xl text-gray-900">
                    {title}
                </h2>
                <p className="text-lg mb-12">
                    {`${startCase(metroArea[0])} > ${startCase(county[0])} > ${startCase(region[0])}`} 
                </p>
                <p className="text-lg mb-10 leading-relaxed">
                    {description}
                </p>
                <ul className="text-lg mb-12 px-5 list-disc markdown">
                  <li className="mb-6">
                    <h3>Industry</h3>
                    <ul>
                      {industry.map((category, index) => <li key={index}>{category}</li>)}
                    </ul>
                  </li>
                  <li className="mb-6">
                    <h3>Address</h3>
                    <a href={mapLink} target="_blank" rel="noopener noreferrer">{streetAddress}</a>
                  </li>
                  <li className="mb-6">
                    <h3>Phone</h3>
                    <a href={`tel:${tel}`}>{tel}</a>
                  </li>
                  <li className="mb-6">
                    <h3>Website</h3>
                    <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                  </li>
                </ul>
                <PostContent
                    className="text-lg leading-relaxed"
                    content={content}
                />
            </div>
            <div className="image-carousel flex-1 bg-gray-200"></div>
        </section>
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
        metroArea={post.frontmatter.metroArea}
        county={post.frontmatter.county}
        region={post.frontmatter.region}
        type={post.frontmatter.type}
        industry={post.frontmatter.industry}
        streetAddress={post.frontmatter.streetAddress}
        city={post.frontmatter.city}
        state={post.frontmatter.state}
        zip={post.frontmatter.zip}
        addressLink={post.frontmatter.addressLink}
        tel={post.frontmatter.tel}
        website={post.frontmatter.website}
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
        metroArea
        county
        region
        type
        industry
        streetAddress
        addressLink
        city
        state
        zip
        tel
        website
      }
    }
  }
`;