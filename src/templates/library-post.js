import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const LibraryPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="lg:px-48 px-12 py-8 bg-orange-100">
      {helmet || ""}
      <div className="">
        <div className="">
          <div className="">
            <h1 className="lg:text-6xl text-4xl heaviest josefin leading-tight text-gray-900">
              {title}
            </h1>
            <p className="lg:text-4xl text-2xl">
              <span className="highlight josefin pt-1 pr-1">{description}</span>
            </p>
            <PostContent className="text-lg pt-4 font-serif markdown" content={content} />
            {tags && tags.length ? (
              <div className="flex inline-flex align-middle py-8">
                <h4 className="text-lg">Tags:</h4>
                <ul className="text-orange-500 font-bold ml-4 flex inline-flex">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

LibraryPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const LibraryPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <LibraryPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Library">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

LibraryPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default LibraryPost;

export const pageQuery = graphql`
  query LibraryPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
