import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageDivider from "../components/pageDivider/pageDivider"
import Img from "gatsby-image"
import titleCardsStyle from "../styles/frontPage/titleCards.scss"

const FrontPage = props => {
  const {
    data: {
      wpgraphql: { page, posts, mediaItemBy },
    },
  } = props
  const { title } = page
  const { edges } = posts
  return (
    <Layout>
      <SEO title={title} />
      <Img fluid={mediaItemBy.imageFile.childImageSharp.fluid} alt={title} />
      <PageDivider component="h2">Onze laatste artikelen</PageDivider>
      <div className="container grid">
        {edges.map(edge => {
          const { title, uri, featuredImage, categories } = edge.node
          return (
            <Link to={uri} className="title-card position-relative">
              <span className="title-card-category position-absolute">
                console.log(categories.edges.node.name)
              </span>
              <h2 key={uri} className="title-card-title position-absolute">
                {title}
              </h2>
              {featuredImage.imageFile && (
                <Img
                  sizes={{
                    ...featuredImage.imageFile.childImageSharp.fluid,
                    aspectRatio: 16 / 9,
                  }}
                  alt={title}
                  className="title-card-image"
                />
              )}
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default FrontPage

export const frontPageQuery = graphql`
  query GET_FRONTPAGE($id: ID!) {
    wpgraphql {
      mediaItemBy(mediaItemId: 25420) {
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
      page(id: $id) {
        title
        content
        uri
      }
      posts(first: 6) {
        edges {
          node {
            categories(
              where: { shouldOutputInFlatList: true, childless: true }
            ) {
              edges {
                node {
                  name
                }
              }
            }
            uri
            featuredImage {
              altText
              sourceUrl
              sizes
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            title(format: RENDERED)
          }
        }
      }
    }
  }
`
