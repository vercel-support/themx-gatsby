import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = props => {
  const {
    data: {
      wpgraphql: { post },
    },
  } = props
  const {
    title,
    author,
    categories,
    tags,
    content,
    hotel_cards_afflink_1,
  } = post
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />

      <div>{hotel_cards_afflink_1}</div>

      <ul>
        <li>
          Geschreven door: <Link to={`${author.slug}`}>{author.name}</Link>
        </li>
        <li>
          Categorie:
          <ul>
            {categories.nodes.map(cat => (
              <li>
                <Link to={`/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          Tags:
          <ul>
            {tags.nodes.map(cat => (
              <li>
                <Link to={`/${tags.slug}`}>{tags.name}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </Layout>
  )
}

export default Post

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
