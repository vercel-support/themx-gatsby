import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "./categoryCards.scss"
import Img from "gatsby-image"

export default function CategoryCards({ className }) {
  const data = useStaticQuery(graphql`
    query CategoryCardsQuery {
      wpgraphql {
        posts(first: 3, where: { categoryName: "Budget" }) {
          nodes {
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
    <section className={`container grid pb-60 ${className}`}>
      {data.wpgraphql.posts.nodes.map(node => {
        const { title, excerpt, uri, featuredImage } = node
        return (
          <Link className="category-cards card-shadow" to={uri}>
            {featuredImage.imageFile && (
              <Img
                sizes={{
                  ...featuredImage.imageFile.childImageSharp.fluid,
                  aspectRatio: 3 / 2,
                }}
                alt={featuredImage.altText}
                className="title-card-image rounded"
              />
            )}
            <div className="p-16 d-flex flex-column">
              <h3
                className="pb-16"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p
                className="pb-16"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
              <span className="ml-auto align-self-end">Lees meer...</span>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
