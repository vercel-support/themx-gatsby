import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const JumpMenu = propzs => {
  console.log(propzs)
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
