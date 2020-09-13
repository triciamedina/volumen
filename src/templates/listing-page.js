import React from "react";
import Helmet from "react-helmet"; // handles html head information in react
import { graphql } from "gatsby"; // inmort graphql for queries and Link for linking
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
        helmet
    }) => {

    const PostContent = contentComponent || Content;

    return (
        <section className="flex flex-row">
            {helmet || ""}
            <div className="flex-1 pr-10">
                <Link 
                    to={`/directory/browse/${metroArea}/${county}/${region}`}
                    className="inline-block my-4 border-b-2 border-green-500 text-gray-800 font-straight font-medium"
                    state={{ isOpen: type }}
                >
                    Back
                </Link>
                <h2 className="font-straight font-black text-2xl text-gray-900">
                    {title}
                </h2>
                <p className="text-base mb-12">
                    {`${startCase(metroArea[0])} > ${startCase(county[0])} > ${startCase(region[0])}`} 
                </p>
                <p className="text-base mb-10">
                    {description}
                </p>
                <PostContent
                    className="text-lg pt-4 font-curvy markdown"
                    content={content}
                />
            </div>
            <div className="flex-1 bg-gray-200"></div>
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
      }
    }
  }
`;