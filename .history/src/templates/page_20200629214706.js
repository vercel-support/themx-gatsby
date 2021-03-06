import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import contentParser from "gatsby-wpgraphql-inline-images"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"
import Typography from "../components/typography/typography"
import Breadcrumbs from "../components/Breadcrumbs"

const Page = props => {
  const {
    data: {
      wpgraphql: { page, content, seo },
    },
  } = props
  const { title } = page
  return (
    <Layout>
      <Breadcrumbs props={seo} />
      <SEO title={title} />
      <div className="container">
        <Typography variant="h1">{title}</Typography>
        {/* <div>{contentParser({ content }, { wordPressUrl, uploadsUrl })}</div> */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
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
        seo {
          breadcrumbs {
            text
            url
          }
        }
      }
    }
  }
`
