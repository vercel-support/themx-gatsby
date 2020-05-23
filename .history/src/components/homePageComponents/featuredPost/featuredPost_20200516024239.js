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
            xs: imageFile {
              childImageSharp {
                fluid(maxWidth: 575, maxHeight: 575, srcSetBreakpoints: 575) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          featuredImage {
            sourceUrl
            sm: imageFile {
              childImageSharp {
                fluid(maxWidth: 767, maxHeight: 767, srcSetBreakpoints: 767) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          featuredImage {
            sourceUrl
            md: imageFile {
              childImageSharp {
                fluid(maxWidth: 991, maxHeight: 512, srcSetBreakpoints: 991) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          featuredImage {
            sourceUrl
            lg: imageFile {
              childImageSharp {
                fluid(maxWidth: 1199, maxHeight: 512, srcSetBreakpoints: 1199) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          featuredImage {
            sourceUrl
            xl: imageFile {
              childImageSharp {
                fluid(maxWidth: 1919, maxHeight: 512, srcSetBreakpoints: 1919) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          featuredImage {
            sourceUrl
            ret: imageFile {
              childImageSharp {
                fluid(maxWidth: 2560, maxHeight: 512, srcSetBreakpoints: 2560) {
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
    xs.childImageSharp.fluid,
    {
      ...xs.childImageSharp.fluid,
      media: `(max-width: 575px)`,
    },

    sm.childImageSharp.fluid,
    {
      ...sm.childImageSharp.fluid,
      media: `(max-width: 767px)`,
    },

    md.childImageSharp.fluid,
    {
      ...md.childImageSharp.fluid,
      media: `(max-width: 991px)`,
    },

    lg.childImageSharp.fluid,
    {
      ...lg.childImageSharp.fluid,
      media: `(max-width: 1199px)`,
    },

    xl.childImageSharp.fluid,
    {
      ...xl.childImageSharp.fluid,
      media: `(max-width:1919 px)`,
    },

    ret.childImageSharp.fluid,
    {
      ...ret.childImageSharp.fluid,
      media: `(min-width: 1920px)`,
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
