import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"

const PostContent = props => {
  const {
    data: {
      wpgraphql: { post },
    },
  } = props
  const { content } = post

  console.log(props)
  return (
    <Layout>
      <div>{content}</div>
    </Layout>
  )
}

export default PostContent

export const postContentQuery = graphql`
  query GET_POSTCONTENT($id: ID!) {
    wpgraphql {
      post(id: $id) {
        content
      }
    }
  }
`
