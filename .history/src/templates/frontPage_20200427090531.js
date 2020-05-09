import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const FrontPage = props => {
  const {
    data: {
      wpgraphql: { page },
    },
  } = props
  const { title, content } = page
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}FRONTPAGE!</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <p>Henk!</p>
    </Layout>
  )
}

export default FrontPage

export const pageQuery = graphql`
  query GET_FRONTPAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        uri
      }
    }
  }
`
