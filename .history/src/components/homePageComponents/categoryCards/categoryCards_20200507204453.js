import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "./categoryCards.scss"
import Img from "gatsby-image"
import moment from "moment"

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
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <section className="container grid">
      {data.wpgraphql.posts.nodes.map(node => {
        const { date, title, excerpt, uri, featuredImage } = node
        return (
          <Link className="category-cards card-shadow" to={uri}>
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
            <div className="p-16">
              <h3
                className="pb-16"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p
                className="pb-16"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
              <span>{date.toLocaleDateString}</span>
              <span>Lees meer...</span>
            </div>
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
