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

  const { uri, title, featuredImage } = data.wpgraphql.post
  return (
    <section className="container-fluid">
      <div className="d-flex">
        <span>Uitgelicht</span>
        <h3 dangerouslySetInnerHTML={{ __html: title }} />
        <Link to={uri} class="button">
          Lees artikel
        </Link>
      </div>
      <Img
        sizes={{
          ...featuredImage.imageFile.childImageSharp.fluid,
          aspectRatio: 21 / 9,
        }}
        alt={featuredImage.altText}
      />
    </section>
  )
}
