import React from "react"
import { graphql } from "gatsby"

const JumpMenu = props => {
  const {
    data: {
      wpgraphql: { post },
    },
  } = props
  const { content } = post
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content,
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
