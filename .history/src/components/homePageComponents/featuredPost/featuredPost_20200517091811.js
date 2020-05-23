import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "./featuredPost.scss"
import "../../button/button.scss"
import PropTypes from "prop-types"

export default function FeaturedPost({ className }) {
  const data = useStaticQuery(graphql`
    query FeaturedPostQuery {
      wpgraphql {
        postBy(postId: 15248) {
          uri
          title
          featuredImage {
            sourceUrl
            portrait: imageFile {
              childImageSharp {
                fluid(maxWidth: 757, maxHeight: 300) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            landscape: imageFile {
              childImageSharp {
                fluid(maxWidth: 2560, maxHeight: 750) {
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

  const { uri, title, featuredImage } = data.wpgraphql.postBy
  const featuredImageSources = [
    featuredImage.portrait.childImageSharp.fluid,
    {
      ...featuredImage.portrait.childImageSharp.fluid,
    },

    featuredImage.landscape.childImageSharp.fluid,
    {
      ...featuredImage.landscape.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ]

  return (
    <section className={className}>
      <div className="position-relative">
        <Img fluid={featuredImageSources} alt={featuredImage.altText} />
        <div className="featured-post-overlay d-flex justify-content-center flex-column position-absolute text-white px-60">
          <span className="pb-12">Uitgelicht</span>
          <h3 className="pb-48" dangerouslySetInnerHTML={{ __html: title }} />
          <Link to={uri} class="button mr-auto">
            Lees artikel
          </Link>
        </div>
      </div>
    </section>
  )
}

FeaturedPost.propTypes = {
  className: PropTypes.string,
}

FeaturedPost.defaultProps = {
  className: undefined,
}