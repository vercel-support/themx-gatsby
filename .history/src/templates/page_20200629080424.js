import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import contentParser from "gatsby-wpgraphql-inline-images"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"
import Typography from "../components/typography/typography"

const Page = props => {
  const {
    data: {
      wpgraphql: { page, content, seo },
    },
  } = props
  const { title, seo } = page
  return (
    <Layout>
      {/* <div class="d-flex align-items-center">
        {seo.breadcrumbs.map((breadcrumb, index) => {
          return (
            <div className="d-inline" key={index}>
              {breadcrumb.text == "Home" ? (
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} />
                  <span className="sr-only">Home</span>
                </Link>
              ) : (
                <span className="d-flex align-items-center">
                  {index ? (
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="px-2 mx-8 text-gray-400"
                    />
                  ) : (
                    ""
                  )}
                  <Link to={breadcrumb.url.replace(config.wordPressUrl, "")}>
                    <Typography
                      component="span"
                      weight="light"
                      variant="body-s"
                    >
                      {breadcrumb.text}
                    </Typography>
                  </Link>
                </span>
              )}
            </div>
          )
        })}
      </div> */}
      {console.log(seo)}
      <SEO title={title} />
      <h1>{title}</h1>
      {/* <div>{contentParser({ content }, { wordPressUrl, uploadsUrl })}</div> */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
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
