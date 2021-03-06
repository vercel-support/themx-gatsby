import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const JumpMenu = propss => {
  console.log(props)
  return <Layout></Layout>
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
