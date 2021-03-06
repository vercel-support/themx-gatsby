import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Typography from "../components/typography/typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"
import Breadcrumbs from "../components/Breadcrumbs"
import "categoryDestinations.scss"

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
        <Breadcrumbs props={seo} />

        <ul className="destinations-grid list-unstyled m-0 d-flex justify-content-between">
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
