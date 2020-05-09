import React from "react"
import { graphql } from "gatsby"

const HotelCards = () => {
  return <h4>{props.henk}</h4>
}

export default HotelCards

export const hotelCardsQuery = graphql`
  query GET_HOTELCARDS($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
      }
    }
  }
`
