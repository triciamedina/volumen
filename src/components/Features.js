import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class StyleRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="flex lg:flex-row flex-col justify-between max-w-6xl mx-auto">
        {posts &&
          posts.map(({ node: post }) => (
            <div 
            className="lg:w-1/3 md:w-2/3 w-full p-4 overflow-hidden flex flex-col mx-auto"
            key={post.id}
            >
            <div
              className="w-full h-full rounded overflow-hidden bg-white shadow-lg flex-col flex justify-between"
            >
              {post.frontmatter.featuredimage ? (
                <div className="w-full">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.featuredimage,
                      alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                    }}
                  />
                </div>
              ) : null}
              <div className="px-6 py-4">
                <Link className="font-curvy italic text-4xl leading-9 text-gray-900" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>{" "}
                <p className="text-gray-700 text-base font-straight pt-4">
                  {post.frontmatter.description}
                </p>
                <Link
                  className="text-orange-600 font-bold"
                  to={post.fields.slug}
                >
                  Read More →
                </Link>
              </div>
              <div className="px-6 py-4">
                <span className="inline-block py-1 text-sm font-semibold text-gray-700 border-b-2 border-orange-500">
                  {post.frontmatter.date}
                </span>
              </div>
            </div>
            </div>
          ))}
      </div>
    );
  }
}

StyleRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query FeaturesQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { promo: { eq: true } } }
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
                description
                date(formatString: "MMMM DD, YYYY")
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <StyleRoll data={data} count={count} />}
  />
);
