import React from "react"
import { graphql } from "gatsby"

const HotelCards = ({ data }) => {
  return <h4>{data.wpgraphql.post.title}</h4>
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
