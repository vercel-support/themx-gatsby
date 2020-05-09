import React from "react"
import { graphql } from "gatsby"

export default () => (
  return <h4>{props.henk}</h4>
)

export const hotelCardsQuery = graphql`
  query GET_HOTELCARDS($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
      }
    }
  }
`
