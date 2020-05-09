import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "./categoryCards.scss"

export default function CategoryCards() {
  const data = useStaticQuery(graphql`
    query CategoryCardsQuery {
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
  `)

  return <span>{data.posts.nodes.title}</span>
}
