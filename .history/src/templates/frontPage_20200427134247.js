import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const FrontPage = props => {
  const {
    data: {
      wpgraphql: { page },
    },
  } = props
  const { title, content, data } = page
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}FRONTPAGE!</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <p>Henk!</p>
      <div>
        {data.wpgraphql.posts.edges.map(edge => {
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
