import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import contentParser from "gatsby-wpgraphql-inline-images"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import "../components/postComponents/hotelCards/hotelCards.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faPlane } from "@fortawesome/free-solid-svg-icons"
import {
  faInstagram,
  faTwitter,
  faPinterestSquare,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons"
import config from "../../config.js"
import Typography from "../components/typography/typography"
import Breadcrumbs from "../components/Breadcrumbs"

const Post = props => {
  const {
    data: {
      wpgraphql: { post },
    },
  } = props
  const { wordPressUrl, uploadsUrl } = config
  const {
    title,
    author,
    categories,
    tags,
    uri,
    content,
    featuredImage,
    hotelCards,
    seo,
  } = post
  const imageSourcesHeader = [
    featuredImage.imageFile &&
      (featuredImage.imageFile.childImageSharp.fluid,
      {
        ...featuredImage.landscape.childImageSharp.fluid,
        media: `(min-width: 768px)`,
      }),
  ]

  return (
    <Layout>
      {featuredImage.imageFile && (
        <Img fluid={imageSourcesHeader} alt={featuredImage.altText} />
      )}
      <div className="content-layout container">
        <Breadcrumbs props={seo} />

        <section className="pt-100">
          <SEO title={title} />
          <h1>{title}</h1>
          {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
          <div>{contentParser({ content }, { wordPressUrl, uploadsUrl })}</div>
        </section>

        <section className="d-flex align-items-center pb-24">
          <Typography
            type="body-m"
            component="h5"
            disableMargin
            className="text-gray-600 d-flex align-items-center"
          >
            {author.customAuthorData.customavatar.imageFile && (
              <Img
                fixed={
                  author.customAuthorData.customavatar.imageFile.childImageSharp
                    .fixed
                }
                alt={`De avatar van ${author.name}`}
                className="rounded-circle mr-16"
              />
            )}
            <Typography
              className="d-flex flex-column border-bottom position-relative"
              type="body-s"
              disableMargin
            >
              <FontAwesomeIcon
                icon={faPlane}
                className="position-absolute right-0 bottom-n7"
                size="xs"
              />
              <Typography disableMargin>Geschreven door</Typography>
              <div className="d-flex">
                <Link to={`/author/${author.slug}/`} className="pr-8">
                  {author.name}
                </Link>
                {/* <div>
                  <a
                    href={`https://facebook.com/${author.customAuthorData.customfacebook}`}
                    className="px-4 text-gray-600"
                  >
                    <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
                  </a>
                  <a
                    href={`https://twitter.com/${author.customAuthorData.customtwitter}`}
                    className="px-4 text-gray-600"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                  </a>
                  <a
                    href={`https://instagram.com/${author.customAuthorData.custominstagram}`}
                    className="px-4 text-gray-600"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                  </a>
                  <a
                    href={`https://pinterest.com/${author.customAuthorData.custompinterest}`}
                    className="px-4 text-gray-600"
                  >
                    <FontAwesomeIcon icon={faPinterestSquare} size="lg" />
                  </a>
                </div> */}
              </div>
            </Typography>
          </Typography>
        </section>

        {hotelCards.nPlaatsnaam && (
          <section className="hotel-cards">
            <h4>
              Chille hotels {hotelCards.inopbij} {hotelCards.nPlaatsnaam}
            </h4>
            <div className="d-flex">
              <a
                href={`${hotelCards.nHotel1Afflink}`}
                className="hotel-cards-single position-relative mr-md-8"
              >
                <h5 className="hotel-cards-single-title position-absolute top-16 left-16">
                  {hotelCards.nHotel1Naam}
                </h5>
                <span className="hotel-cards-single-tested position-absolute bottom-16 left-16">
                  {hotelCards.nHotel2Getest === true ? (
                    <span>
                      Travelaar getest
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </span>
                  ) : (
                    ``
                  )}
                </span>
                <img
                  src={`${hotelCards.nHotel1Afbeelding}`}
                  alt={`${hotelCards.nHotel1Naam}`}
                  className="rounded"
                />
              </a>
              <a
                href={`${hotelCards.nHotel2Afflink}`}
                className="hotel-cards-single position-relative ml-md-8"
              >
                <h5 className="position-absolute top-16 left-16">
                  {hotelCards.nHotel2Naam}
                </h5>
                <span className="position-absolute bottom-16 left-16">
                  {hotelCards.nHotel2Getest === true ? (
                    <span>
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-8" />
                      Travelaar getest
                    </span>
                  ) : (
                    ``
                  )}
                </span>
                <img
                  src={`${hotelCards.nHotel2Afbeelding}`}
                  alt={`${hotelCards.nHotel2Naam}`}
                  className="rounded"
                />
              </a>
            </div>
          </section>
        )}
        <ul className="list-unstyled ml-0">
          <li></li>
          {categories.nodes.name && (
            <li>
              Categorie:
              <ul>
                {categories.nodes.map(cat => (
                  <li>
                    <Link to={`/${cat.slug}`}>{cat.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {tags.nodes.name && (
            <li>
              Tags:
              <ul>
                {tags.nodes.map(cat => (
                  <li>
                    <Link to={`/${tags.slug}`}>{tags.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        uri
        content
        seo {
          breadcrumbs {
            text
            url
          }
        }
        hotelCards {
          inopbij
          nHotel1Afbeelding
          nHotel1Afflink
          nHotel1Getest
          nHotel1Naam
          nHotel2Afbeelding
          nHotel2Afflink
          nHotel2Getest
          nHotel2Naam
          nPlaatsnaam
        }
        featuredImage {
          sourceUrl
          altText
          imageFile {
            childImageSharp {
              fluid(maxWidth: 757, maxHeight: 300) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
          landscape: imageFile {
            childImageSharp {
              fluid(maxWidth: 2560, maxHeight: 500) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        author {
          name
          slug
          customAuthorData {
            customfacebook
            custominstagram
            custompinterest
            customtwitter
            customavatar {
              sourceUrl
              imageFile {
                childImageSharp {
                  fixed(width: 50, height: 50) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
        categories {
          nodes {
            slug
            name
          }
        }
        tags {
          nodes {
            slug
            name
          }
        }
      }
    }
  }
`
