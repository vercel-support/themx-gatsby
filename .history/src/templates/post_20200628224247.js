import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import contentParser from "gatsby-wpgraphql-inline-images"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import "../components/postComponents/hotelCards/hotelCards.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlane, faHome } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"
import Typography from "../components/typography/typography"

const Post = props => {
  const {
    data: {
      wpgraphql: { post },
    },
  } = props
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
        {seo.breadcrumbs.map((breadcrumb, index) => {
          return (
            <div key={index}>
              {breadcrumb.text == "Home" ? (
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} />
                  <span className="sr-only">Home</span>
                </Link>
              ) : (
                <span className="d-flex aign-items-center">
                  {index ? (
                    <FontAwesomeIcon icon={faPlane} className="px-4 mx-8" />
                  ) : (
                    ""
                  )}
                  <Link to={breadcrumb.url.replace(config.wordPressUrl, "")}>
                    <Typography
                      component="span"
                      weight="light"
                      variant="body-s"
                    >
                      {breadcrumb.text}
                    </Typography>
                  </Link>
                </span>
              )}
            </div>
          )
        })}
        <SEO title={title} />
        <h1 className="pt-100">{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />

        {/* <div>{contentParser({ content }, { wordPressUrl, uploadsUrl })}</div> */}
        {hotelCards.nPlaatsnaam && (
          <section className="hotel-cards">
            <h4>
              Chille hotels {hotelCards.inopbij} {hotelCards.nPlaatsnaam}
            </h4>
            <div className="grid">
              <a
                href={`${hotelCards.nHotel1Afflink}`}
                className="hotel-cards-single position-relative"
              >
                <h5 className="hotel-cards-single-title position-absolute top-16 left-16">
                  {hotelCards.nHotel1Naam}
                </h5>
                <span className="hotel-cards-single-tested position-absolute bottom-16 left-16">
                  {hotelCards.nHotel1Getest === true ? `Travelaar getest` : ``}
                </span>
                <img
                  src={`${hotelCards.nHotel1Afbeelding}`}
                  alt={`${hotelCards.nHotel1Naam}`}
                  className="rounded"
                />
              </a>
              <a
                href={`${hotelCards.nHotel2Afflink}`}
                className="hotel-cards-single position-relative"
              >
                <h5 className="position-absolute top-16 left-16">
                  {hotelCards.nHotel2Naam}
                </h5>
                <span className="position-absolute top-16 right-16">
                  {hotelCards.nHotel2Getest === true ? `Travelaar getest` : ``}
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
          <li>
            Geschreven door:{" "}
            <Link to={`/author/${author.slug}/`}>{author.name}</Link>
          </li>
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
