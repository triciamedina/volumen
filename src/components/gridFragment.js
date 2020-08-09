import {  graphql } from 'gatsby';
export const icon = graphql`
fragment icon on File {
  childImageSharp {
    fluid(maxWidth: 300) {
      ...GatsbyImageSharpFluid_withWebp
    }
  }
}
`;
// This exists for graphql purposes, allows us to reuse a graphql fragment. Does not get imported anywhere by design