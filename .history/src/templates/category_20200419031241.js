import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArchivePosts from "../components/archivePosts"

const CategoryTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, description, children, posts } = category
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
      <ArchivePosts posts={posts} />
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
