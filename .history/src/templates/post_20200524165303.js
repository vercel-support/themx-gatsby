import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import contentParser from "gatsby-wpgraphql-inline-images"

const Post = props => {
  const {
    data: {
      wpgraphql: { post },
    },
    pageContext: {
      pluginOptions: { wordPressUrl, uploadsUrl },
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
  const imageSourcesHeader = [
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
    <Layout>
      {featuredImage && (
        <Img fluid={imageSourcesHeader} alt={featuredImage.altText} />
      )}
      <div className="content-layout container pt-100">
        <SEO title={title} />
        <h1>{title}</h1>
        <div>{contentParser({ content }, { wordPressUrl, uploadsUrl })}</div>
        {/* <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        /> */}

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
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          landscape: imageFile {
            childImageSharp {
              fluid(maxWidth: 2560, maxHeight: 500) {
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