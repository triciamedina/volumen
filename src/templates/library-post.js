import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const LibraryPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  date,
  featuredimage,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="my-12 bg-white">
      {helmet || ""}

      <div className="max-w-3xl mx-auto px-6">
        <h1 className="lg:text-6xl text-4xl italic heaviest curvy leading-tight text-gray-900">
          {title}
        </h1>
        <h2 className="lg:text-4xl text-2xl">
          <span className="highlight curvy italic pt-1 pr-1">
            {description}
          </span>
        </h2>
        <p className="text-gray-600 curvy">{date}</p>
        <div className="w-full text-center rounded-md flex">
          {featuredimage ? (
            <div className="self-center w-full">
              <PreviewCompatibleImage
                imageInfo={{
                  image: featuredimage,
                  alt: `featured image thumbnail for post ${title}`,
                }}
              />
            </div>
          ) : null}
        </div>
        <PostContent
          className="text-lg pt-4 curvy markdown"
          content={content}
        />
        {tags && tags.length ? (
          <div className="flex inline-flex align-middle py-8">
            <h4 className="text-lg">Tags:</h4>
            <ul className="text-orange-500 font-bold ml-4 flex inline-flex">
              {tags.map((tag) => (
                <li key={tag + `tag`}>
                  <Link className='pr-4' to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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
        featuredimage={post.frontmatter.featuredimage}
        date={post.frontmatter.date}
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
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
