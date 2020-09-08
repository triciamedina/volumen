import React from "react";
import Helmet from "react-helmet"; // handles html head information in react
import { graphql } from "gatsby"; // inmort graphql for queries and Link for linking
import { Link } from "@reach/router";

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import "../components/tailwind.css"

export const ListingPageTemplate = ({
        content,
        contentComponent,
        title,
        description,
        browsePath,
        location,
        type,
        helmet
    }) => {

    const getBreadcrumb = (path) => {
        const str = path.slice(8);
        let breadCrumb = "";

        for (let i = 0; i < str.length; i++) {
            if (i === 0 || str[i - 1] === "/" || str[i - 1] === "-") { 
                breadCrumb += str[i].toUpperCase();
                continue;
            }

            breadCrumb += (({
                "/": " > ",
                "-": " "
            })[str[i]] || str[i] );
        }

        return breadCrumb;
    };

    const PostContent = contentComponent || Content;

    return (
        <section className="flex flex-row">
            {helmet || ""}
            <div className="flex-1 pr-10">
                <Link 
                    to={`/directory${browsePath}`}
                    className="inline-block my-4 border-b-2 border-green-500 text-gray-800 font-straight font-medium"
                    state={{ isOpen: type }}
                >
                    Back
                </Link>
                <h2 className="font-straight font-black text-2xl text-gray-900">
                    {title}
                </h2>
                <p className="text-base mb-12">
                    {getBreadcrumb(browsePath)}
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
          <Helmet titleTemplate="%s | Library">
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
        browsePath={post.frontmatter.browsePath}
        location={post.frontmatter.location}
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
        browsePath
        location
        type
      }
    }
  }
`;