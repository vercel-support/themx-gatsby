import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Typography from "../components/typography/typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"

const DestinationsTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, children, seo } = category
  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <section className="container">
        <h1 className="my-24">{name}</h1>
        <div class="d-flex align-items-center">
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
        </div>

        <ul className="list-unstyled m-0 d-flex justify-content-between">
          {children.nodes.map(node => (
            <li className="mx-auto text-center">
              <Link to={node.uri}>
                <Typography
                  variant="h4"
                  component="h2"
                  className="text-gray-700"
                >
                  {node.name}
                </Typography>
              </Link>
              <ul className="list-unstyled m-0">
                {node.children.nodes.map(childNode => (
                  <li>
                    <Link to={childNode.uri} className="text-gray-600">
                      {childNode.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default DestinationsTemplate

export const pageQuery = graphql`
  query GET_DESTINATIONS($id: ID!) {
    wpgraphql {
      category(id: $id) {
        description
        id
        name
        slug
        seo {
          breadcrumbs {
            text
            url
          }
        }
        children(last: 100) {
          nodes {
            name
            uri
            children(last: 100) {
              nodes {
                name
                uri
              }
            }
          }
        }
      }
    }
  }
`
