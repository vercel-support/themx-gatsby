import React from "react"
import { Link, graphql } from "gatsby"
import Pagination from "../components/pagination"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Posts = props => {
  const {
    data: {
      wpgraphql: { posts },
    },
    pageContext: { pageNumber, hasNextPage },
  } = props
  const currentPage = pageNumber ? ` - Pagina ${pageNumber}` : ` `
  return (
    <Layout>
      <SEO title={`Alle artikelen`} />
      <h1>Artikelenn{currentPage}</h1>
      {posts.nodes.map(post => (
        <Link to={post.uri}>
          <h2 key={post.id}>{post.title}</h2>
        </Link>
      ))}
      <Pagination pageNumber={pageNumber} hasNextPage={hasNextPage} />
    </Layout>
  )
}

export default Posts

export const pageQuery = graphql`
  query GET_POSTS($ids: [ID]) {
    wpgraphql {
      posts(where: { in: $ids }) {
        nodes {
          id
          title
          uri
        }
      }
    }
  }
`
