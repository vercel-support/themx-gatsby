import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const HotelCards = () => {
  return (
    <section className="hotel-cards-wr">
      <a className="hotel-1">
        <h5>Hoi henk</h5>
        {/* <Img /> */}
      </a>
      <a className="hotel-2">
        <h5>Hoi Pieter</h5>
        {/* <Img /> */}
      </a>
    </section>
  )
}

export default HotelCards

export const hotelCardQuery = graphql`
  query GET_HOTEL_CARDS($id: ID!) {
    wpgraphql {
      post(id: $id) {
        hotel_cards_afflink_1
        hotel_cards_afflink_2
        hotel_cards_image_1
        hotel_cards_image_2
        hotel_cards_location
        hotel_cards_name_1
        hotel_cards_name_2
        hotel_cards_tested_1
        hotel_cards_tested_2
      }
    }
  }
`
