import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "./featuredPost.scss"

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
    <section className="container-fluid position-relative">
      <Img
        sizes={{
          ...featuredImage.imageFile.childImageSharp.fluid,
          aspectRatio: 21 / 9,
        }}
        alt={featuredImage.altText}
      />
      <div className="featured-post-overlay d-flex justify-content-center mx-16 flex-column position-absolute">
        <span>Uitgelicht</span>
        <h3 dangerouslySetInnerHTML={{ __html: title }} />
        <Link to={uri} class="button">
          Lees artikel
        </Link>
      </div>
    </section>
  )
}
