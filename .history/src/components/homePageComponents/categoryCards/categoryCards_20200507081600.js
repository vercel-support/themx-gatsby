import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "./categoryCards.scss"
import Img from "gatsby-image"

export default function CategoryCards() {
  const data = useStaticQuery(graphql`
    query CategoryCardsQuery {
      wpgraphql {
        posts(first: 3, where: { categoryName: "Budget" }) {
          nodes {
            date
            title
            excerpt(format: RENDERED)
            uri
            featuredImage {
              altText
              sourceUrl
              sizes
            }
          }
        }
      }
    }
  `)

  return (
    <section>
      {data.wpgraphql.posts.nodes.map(node => {
        const { date, title, excerpt, uri, featuredImage } = node
        return (
          <Link to={uri}>
            {featuredImage.imageFile && (
              <Img
                sizes={{
                  ...featuredImage.imageFile.childImageSharp.fluid,
                  aspectRatio: 3 / 2,
                }}
                alt={title}
                className="title-card-image rounded"
              />
            )}
            <h3>{title}</h3>
            <p>{excerpt}</p>
            <span>{date}</span>
          </Link>
        )
      })}
      ,
    </section>
  )
}

{
  /* <span>{data.wpgraphql.posts.nodes[0].title}</span> */
}
