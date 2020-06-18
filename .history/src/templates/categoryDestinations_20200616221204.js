import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Typography from "../components/typography/typography"

const DestinationsTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, children } = category
  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <section className="container">
        <h1>{name}</h1>
        <ul className="list-unstyled m-0">
          {children.nodes.map(node => (
            <li>
              <Link to={node.uri}>
                <Typography variant="h2">{node.name}</Typography>
              </Link>
              <ul className="list-unstyled m-0">
                {node.children.nodes.map(childNode => (
                  <li>
                    <Link to={childNode.uri}>{childNode.name}</Link>
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
