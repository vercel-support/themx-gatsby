import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageDivider from "../components/pageDivider/pageDivider"
import Img from "gatsby-image"
import css from "./styles/frontPage/titleCards.scss"

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
          const { title, uri, featuredImage } = edge.node
          return (
            <Link to={uri}>
              <h2 key={uri}>{title}</h2>
              {featuredImage.imageFile && (
                <Img
                  fluid={featuredImage.imageFile.childImageSharp.fluid}
                  alt={title}
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
            uri
            featuredImage {
              altText
              sourceUrl
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
