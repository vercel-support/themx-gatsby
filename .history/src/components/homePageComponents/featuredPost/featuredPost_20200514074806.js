import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "./featuredPost.scss"
import "../../button/button.scss"

export default function FeaturedPost() {
  const data = useStaticQuery(graphql`
    query FeaturedPostQuery {
      wpgraphql {
        postBy(postId: 15248) {
          uri
          title
          featuredImage {
            altText
            sourceUrl
            portrait: imageFile {
              childImageSharp {
                fluid(
                  maxWidth: 640
                  maxHeight: 640
                  sizes: "(max-width: 640px) 100vw, 100vw"
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            landscape: imageFile {
              childImageSharp {
                fluid(
                  maxWidth: 2560
                  maxHeight: 512
                  sizes: "(max-width: 1280px) 100vw, (max-width: 2560px) 100vw, 100vw"
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  `)
  // livegang

  const imageSources = [
    featuredImage.portrait.childImageSharp.fluid,
    {
      ...featuredImage.portrait.childImageSharp.fluid,
      media: `(max-width: 640px)`,
    },
    featuredImage.landscape.childImageSharp.fluid,
    {
      ...featuredImage.landscape.childImageSharp.fluid,
      media: `(min-width: 640px)`,
    },
  ]

  const { uri, title, featuredImage } = data.wpgraphql.postBy
  return (
    <section className="position-relative">
      <Img fluid={imageSources} alt={featuredImage.altText} />
      <div className="featured-post-overlay d-flex justify-content-center flex-column position-absolute text-white px-60">
        <span className="pb-12">Uitgelicht</span>
        <h3 className="pb-48" dangerouslySetInnerHTML={{ __html: title }} />
        <Link to={uri} class="button mr-auto">
          Lees artikel
        </Link>
      </div>
    </section>
  )
}
