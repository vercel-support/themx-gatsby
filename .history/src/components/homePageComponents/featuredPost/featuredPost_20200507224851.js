import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default function FeaturedPost() {
  const data = useStaticQuery(graphql`
    query FeaturedPostQuery {
      wpgraphql {
        post(id: "cG9zdDoxNTE3OA==") {
          uri
          title
          featuredImage {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <section className="container-fluid">{data.wpgraphql.post.title}</section>
  )
}
