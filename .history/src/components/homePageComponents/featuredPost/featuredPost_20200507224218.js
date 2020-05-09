import React from "react"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"

const FeaturedPost = () => {
  return <span className="container">henk</span>
}

export default FeaturedPost

export const frontPageQuery = graphql`
  query GET_FRONTPAGE($id: ID!) {
    wpgraphql {
      post(id: "cG9zdDoxNTE3OA==") {
        uri
        title
        featuredImage {
          altText
          sourceUrl
        }
      }
    }
  }
`
