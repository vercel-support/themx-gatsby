import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <div>
      <div>
        {data.wpgraphql.posts.edges.map(edge => {
          const { title, uri, featuredImage } = edge.node
          return (
            <Link to={uri}>
              <h2 key={uri}>{title}</h2>
              <img src={featuredImage.sourceUrl} alt={featuredImage.altText} />
            </Link>
          )
        })}
      </div>
    </div>
  </Layout>
)

export const homeQuery = graphql`
  query GET_HOME {
    wpgraphql {
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
