import React from "react"

const JumpMenu = content => {
	const {
		data: {
			wpgraphql: {
				post: { content },
			},
		},
	}
  <div
    dangerouslySetInnerHTML={{
      __html: content.replace("Plage", "henk"),
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
