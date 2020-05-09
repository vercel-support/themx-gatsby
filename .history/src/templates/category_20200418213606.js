import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const CategoryTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, description, children, uri } = category
  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <h1>{name}</h1>
      <p>{description}</p>
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

export default CategoryTemplate

export const pageQuery = graphql`
  query GET_CATEGORY($id: ID!) {
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
