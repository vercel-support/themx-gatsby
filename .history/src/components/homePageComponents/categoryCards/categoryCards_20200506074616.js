import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import "./categoryCards.scss"

const CATEGORY_CARDS_QUERY = graphql`
  query GET_CATEGORY_CARDS {
    wpgraphql {
      posts(first: 3, where: { categoryName: "Budget" }) {
        nodes {
          date
          title
          excerpt(format: RENDERED)
          featuredImage {
            altText
            sourceUrl
            sizes
          }
        }
      }
    }
  }
`

const innerCard = item => <div className="grid">{posts.nodes.title}</div>

const CategoryCards = posts => {
  return (
    <StaticQuery
      query={CATEGORY_CARDS_QUERY}
      render={({
        wpgraphql: {
          posts: { nodes },
        },
      }) => {
        return <section>{nodes.map(item => innerCard(item))}</section>
      }}
    />
  )
}

export default CategoryCards
