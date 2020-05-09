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

export const jumpMenuQuery = graphql`
  query GET_JUMPMENU($id: ID!) {
    wpgraphql {
      post(id: $id) {
        content
      }
    }
  }
`
