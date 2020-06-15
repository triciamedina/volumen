import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class LibraryRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="">
      {posts &&
        posts.map(({ node: post }) => (
          <div
            className="max-w-sm w-full lg:max-w-full lg:flex bg-white p-4 rounded-md shadow-lg"
            key={post.id}
          >
            <div className="w-1/2 text-center rounded-md">
              {post.frontmatter.featuredimage ? (
                <div className="">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.featuredimage,
                      alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                    }}
                  />
                </div>
              ) : null}
            </div>
            <div className="w-5/12 flex flex-col justify-between leading-normal mt-4">
              <div className="mb-8">
                <div className="text-gray-900 font-bold mb-2">
                  <Link
                    className="josefin text-4xl"
                    to={post.fields.slug}
                    // to={`/${SlugParser(post.fields.slug)}/`}
                  >
                    {post.frontmatter.title}
                  </Link>
                </div>
                <p className="text-gray-700 text-lg">
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

LibraryRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query LibraryRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "library-post" } } }
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
                description
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
    render={(data, count) => <LibraryRoll data={data} count={count} />}
  />
)
