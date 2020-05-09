import React from "react"
import { graphql } from "gatsby"

const JumpMenu = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: post.content,
      }}
    ></div>
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
