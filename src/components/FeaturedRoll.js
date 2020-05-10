import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class FeaturedRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    let SlugParser = (SlugBoi) => {
      let str = SlugBoi,
        delimiter = "/",
        stopper = 2,
        tokens = str.split(delimiter).slice(1, stopper),
        result = tokens.join(delimiter);
      return result;
    };

    return (
      <div className="">
        {posts &&
          posts.map(({ node: post }) => (
            <div
              className="max-w-sm w-full lg:max-w-full lg:flex"
              key={post.id}
            >
              <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                  <p className="text-sm text-gray-600 flex items-center">
                    <svg
                      className="fill-current text-gray-500 w-3 h-3 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                    </svg>
                    Members only
                  </p>
                  <div className="text-gray-900 font-bold text-xl mb-2">
                    <Link
                      className="title has-text-primary is-size-4"
                      // to={post.fields.slug}
                      to={`/${SlugParser(post.fields.slug)}/`}
                    >
                      {post.frontmatter.title}
                    </Link>
                  </div>
                  <p className="text-gray-700 text-base">
                    {post.excerpt}
                    <br />
                    <br />
                    <Link className="button" to={post.fields.slug}>
                      Keep Reading →
                    </Link>
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="text-sm">
                    <p className="text-gray-600">{post.frontmatter.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

FeaturedRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query FeaturedRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { featuredpost: { eq: true } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                tags
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <FeaturedRoll data={data} count={count} />}
  />
);
