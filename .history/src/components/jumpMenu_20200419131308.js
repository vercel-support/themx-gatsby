import React from "react"

const JumpMenu = props => {
  const {
    data: {
      wpgraphql: {
        post: { content },
      },
    },
  } = props
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
