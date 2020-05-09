import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

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
    content,
    featuredImage,
    hotelCards,
  } = post
  return (
    <Layout>
      {featuredImage.imageFile && (
        <Img fluid={featuredImage.imageFile.childImageSharp.fluid} alt="" />
      )}
      <SEO title={title} />
      <h1>{title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <section className="hotel-cards-wr">
        <h4>
          Chille hotels {hotelCards.inopbij} {hotelCards.nPlaatsnaam}
        </h4>
        <a href={`${hotelCards.nHotel1Afflink}`} className="hotel-1">
          <h5>{hotelCards.nHotel1Naam}</h5>
          <img
            src={`${hotelCards.nHotel1Afbeelding}`}
            alt={`${hotelCards.nHotel1Naam}`}
          />
          <span>
            {hotelCards.nHotel1Getest === true ? `Travelaar getest` : ``}
          </span>
        </a>
        <a href={`${hotelCards.nHotel2Afflink}`} className="hotel-2">
          <h5>{hotelCards.nHotel2Naam}</h5>
          <img
            src={`${hotelCards.nHotel2Afbeelding}`}
            alt={`${hotelCards.nHotel2Naam}`}
          />
          <span>
            {hotelCards.nHotel2Getest === true ? `Travelaar getest` : ``}
          </span>
        </a>
      </section>
      <ul>
        <li>
          Geschreven door: <Link to={`${author.slug}`}>{author.name}</Link>
        </li>
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
      </ul>
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
          imageFile {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_withWebp
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
