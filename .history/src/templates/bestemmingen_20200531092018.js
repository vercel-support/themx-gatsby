import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BestemmingenTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, description, children } = category
  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <h1>{name}</h1>

      <ul>
        {children.nodes.map(node => (
          <li>
            <Link to={node.uri}>{node.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default BestemmingenTemplate

export const pageQuery = graphql`
  query GET_BESTEMMINGEN($id: ID!) {
    wpgraphql {
      category(id: $id) {
        description
        id
        name
        slug
        posts {
          nodes {
            postId
            title(format: RENDERED)
            slug
          }
        }
        children {
          nodes {
            name
            uri
          }
        }
      }
    }
  }
`
