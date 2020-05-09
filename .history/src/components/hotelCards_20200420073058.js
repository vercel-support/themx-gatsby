import React from "react"
import { graphql } from "gatsby"

const HotelCards = ({ data }) => {
  return <h4>{data.wpgraphql.post.hotel_cards_name_1}</h4>
}

export default HotelCards

export const hotelCardsQuery = graphql`
  query GET_HOTELCARDS($id: ID!) {
    wpgraphql {
      post(id: $id) {
        hotel_cards_afflink_1
        hotel_cards_afflink_2
        hotel_cards_city
        hotel_cards_image_1
        hotel_cards_image_2
        hotel_cards_name_1
        hotel_cards_name_2
        hotel_cards_tested_1
        hotel_cards_tested_2
      }
    }
  }
`
