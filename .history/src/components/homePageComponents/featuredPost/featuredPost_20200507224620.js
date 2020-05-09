import React from "react"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"

export default function CategoryCards() {
  const data = useStaticQuery(graphql`
    query CategoryCardsQuery {
      wpgraphql {
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
    }
  `)

  return (
    <section className="container-fluid">{data.wpgraphql.post.title}</section>
  )
}
