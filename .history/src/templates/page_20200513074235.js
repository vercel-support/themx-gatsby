import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = props => {
  const {
    data: {
      wpgraphql: { page },
    },
  } = props
  const { title, content } = page
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <p>Henk!</p>
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
        featuredImage {
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(
                maxWidth: 2560
                maxHeight: 512
                sizes: "(max-width: 1280px) 100vw, (max-width: 2560px) 100vw, 100vw"
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
