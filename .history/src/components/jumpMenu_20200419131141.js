import React from "react"

const JumpMenu = props => {
	const {
		data: {
			wpgraphql: {
				post: { content },
			},
		},
	} = props
  <div
    dangerouslySetInnerHTML={{
      __html: content,
    }}
  ></div>
}

export default JumpMenu

export const jumpMenuQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        content
      }
    }
  }
`
