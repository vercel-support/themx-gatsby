import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const JumpMenu = data => {
  return (
    <Layout>
      <div
        dangerouslySetInnerHTML={{
          __html: data.graphql.post.content,
        }}
      ></div>
    </Layout>
  )
}

export default JumpMenu

export const jumpMenuQuery = graphql`
  query GET_JUMPMENU($id: ID!) {
    wpgraphql {
      post(id: $id) {
        content
      }
    }
  }
`
