import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/PostCard/PostCard"

const UserTemplate = props => {
  const {
    data: {
      wpgraphql: { user, description },
    },
  } = props
  const { name } = user
  return (
    <Layout>
      <SEO title={`Auteur: ${name}`} />
      <h1>{name}</h1>
      <p>{description}</p>
      <PostCard props={posts} />
    </Layout>
  )
}

export default UserTemplate

export const pageQuery = graphql`
  query GET_USER($id: ID!) {
    wpgraphql {
      user(id: $id) {
        id
        name
        description
        posts {
          nodes {
            postId
            title(format: RENDERED)
            slug
            featuredImage {
              altText
              sourceUrl
              sizes
              portrait: imageFile {
                childImageSharp {
                  fixed(width: 540, height: 300, cropFocus: CENTER) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                  }
                }
              }
              landscape: imageFile {
                childImageSharp {
                  fixed(width: 472, height: 300, cropFocus: CENTER) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
