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
  const { name, description, children, slug } = category
  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <h1>{name}</h1>
      <p>{description}</p>
      <ul>
        {children.edges.map(edge => (
          <li>
            <Link to={slug + "/" + edge.node.slug}>{edge.node.name}</Link>
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
          edges {
            node {
              name
              slug
            }
          }
        }
      }
    }
  }
`
