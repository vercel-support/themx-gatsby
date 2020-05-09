import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = props => {
  const {
    data: {
      wpgraphql: { post },
    },
  } = props
  const { title, author, categories, tags, content } = post
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <ul>
        <li>
          Geschreven door: <Link to={`${author.slug}`}>{author.name}</Link>
        </li>
        <li>
          Categorie:
          <ul>
            {categories.nodes.map(cat => (
              <li>
                <Link to={`/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          Tags:
          <ul>
            {tags.nodes.map(cat => (
              <li>
                <Link to={`/${tags.slug}`}>{tags.name}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        uri
        content
        author {
          name
          slug
        }
        categories {
          nodes {
            slug
            name
          }
        }
        tags {
          nodes {
            slug
            name
          }
        }
      }
    }
  }
`
