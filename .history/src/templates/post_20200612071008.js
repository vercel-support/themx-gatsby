import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import contentParser from "gatsby-wpgraphql-inline-images"
import "../components/postComponents/hotelCards/hotelCards.scss"

const Post = props => {
  const {
    data: {
      wpgraphql: { post },
    },
    // pageContext: {
    //   pluginOptions: { wordPressUrl, uploadsUrl },
    // },
  } = props
  const {
    title,
    author,
    categories,
    tags,
    content,
    featuredImage,
    hotelCards,
  } = post
  const pluginOptions = {
    wordPressUrl: `http://localhost/travelaar.dev/`,
    uploadsUrl: `http://localhost/travelaar.dev/wp-content/uploads/`,
  }
  const imageSourcesHeader = [
    {
      ...featuredImage.portrait.childImageSharp.fluid,
      media: `(max-width: 767px)`,
    },
    {
      ...featuredImage.landscape.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ]

  return (
    <Layout>
      {featuredImage && (
        <Img fluid={imageSourcesHeader} alt={featuredImage.altText} />
      )}
      {/* {console.log(<Img fluid={imageSourcesHeader} alt={featuredImage.altText})} */}
      {/* {console.log(contentParser({ content }, pluginOptions))} */}
      <div className="content-layout container pt-100">
        <SEO title={title} />
        <h1>{title}</h1>
        <div>{contentParser({ content }, pluginOptions)}</div>
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
        content(format: RENDERED)
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
          portrait: imageFile {
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
