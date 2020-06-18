import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import contentParser from "gatsby-wpgraphql-inline-images"

const Page = props => {
  const {
    data: {
      wpgraphql: { page },
    },
    pageContext: {
      pluginOptions: { wordPressUrl, uploadsUrl },
    },
  } = props
  const { title, content } = page
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      {/* <div>{contentParser({ content }, { wordPressUrl, uploadsUrl })}</div> */}
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query GET_PAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        uri
      }
    }
  }
`
