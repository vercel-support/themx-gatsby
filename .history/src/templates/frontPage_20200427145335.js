import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const FrontPage = props => {
  const {
    data: {
      wpgraphql: { page, posts },
    },
  } = props
  const { title, content } = page
  const { edges } = posts
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}FRONTPAGE!</h1>
      <div>
        {edges.map(edge => {
          const { title, uri, featuredImage } = edge.node
          return (
            <Link to={uri}>
              <h2 key={uri}>{title}HENK</h2>
              <img src={featuredImage.sourceUrl} alt={featuredImage.altText} />
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
            }
            title(format: RENDERED)
          }
        }
      }
    }
  }
`
