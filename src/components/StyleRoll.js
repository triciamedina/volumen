import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class StyleRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="max-w-5xl mx-auto">
      {posts &&
        posts.map(({ node: post }) => (
          <div
            className="max-w-xl w-full md:max-w-6xl md:flex bg-white p-4 rounded-md shadow-lg mx-auto"
            key={post.id}
          >
            <div className="md:w-1/2 w-full rounded-md flex">
              {post.frontmatter.featuredimage ? (
                <div className="w-full self-center">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.featuredimage,
                      alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                    }}
                  />
                </div>
              ) : null}
            </div>
            <div className="md:w-5/12 w-full flex flex-col justify-between leading-normal mt-4">
              <div className="mb-8">
                <div className="text-gray-900 mb-2 leading-tight">
                  <Link
                    className="curvy italic text-4xl"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                </div>
                <p className="lato text-gray-700 text-lg">
                  {post.frontmatter.description}
                  <br />
                  <br />
                  <Link className="text-orange-600 font-bold" to={post.fields.slug}>
                    Read More →
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
    )
  }
}

StyleRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query StyleRollQuery {
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
                description
                date(formatString: "MMMM DD, YYYY")
                featuredpost
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
        }
      }
    `}
    render={(data, count) => <StyleRoll data={data} count={count} />}
  />
)
