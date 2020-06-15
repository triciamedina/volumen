  
import {  graphql } from 'gatsby';
export const icon = graphql`
fragment icon on File {
  childImageSharp {
    fluid(maxWidth: 300) {
      ...GatsbyImageSharpFluid
    }
  }
}
`;