import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Typography from "../components/typography/typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"
import Breadcrumbs from "../components/Breadcrumbs"

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

        <ul className="list-unstyled m-0 d-flex">
          {children.nodes.map(node => (
            <li className="text-center mx-auto">
              <Link to={node.uri}>
                <Typography
                  variant="h5"
                  component="h2"
                  className="text-gray-700 mb-8"
                >
                  {node.name}
                </Typography>
              </Link>
              <ul className="list-unstyled m-0">
                {node.children.nodes.map(childNode => (
                  <li className="mb-4">
                    <Link to={childNode.uri} className="text-gray-600">
                      <Typography variant="body-s">{childNode.name}</Typography>
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
