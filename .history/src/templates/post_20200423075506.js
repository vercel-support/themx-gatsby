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
    hotel_cards_afflink_2,
    hotel_cards_image_1,
    hotel_cards_image_2,
    hotel_cards_location,
    hotel_cards_name_1,
    hotel_cards_name_2,
    hotel_cards_tested_1,
    hotel_cards_tested_2,
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

      <section className="hotel-cards-wr">
        <h4>{hotel_cards_location}</h4>
        <a href={`${hotel_cards_afflink_1}`} className="hotel-1">
          <h5>{hotel_cards_name_1}</h5>
          <img src={`${hotel_cards_image_1}`} alt={`${hotel_cards_name_1}`} />
        </a>
        <a href={`${hotel_cards_afflink_2}`} className="hotel-2">
          <h5>{hotel_cards_name_2}</h5>
          <img src={`${hotel_cards_image_2}`} alt={`${hotel_cards_name_2}`} />
        </a>
      </section>

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

export const pageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        uri
        content
        hotel_cards_afflink_1
        hotel_cards_afflink_2
        hotel_cards_image_1
        hotel_cards_image_2
        hotel_cards_location
        hotel_cards_name_1
        hotel_cards_name_2
        hotel_cards_tested_1
        hotel_cards_tested_2
        author {
          name
          slug
        }
        categories {
          nodes {
            slug
            name
          }
        }
        tags {
          nodes {
            slug
            name
          }
        }
      }
    }
  }
`
