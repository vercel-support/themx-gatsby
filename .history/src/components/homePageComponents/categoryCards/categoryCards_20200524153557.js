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
            id
            featuredImage {
              altText
              sourceUrl
              sizes
              xsSm: imageFile {
                childImageSharp {
                  fluid(maxWidth: 540, maxHeight: 304, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              mdLgXl: imageFile {
                childImageSharp {
                  fluid(maxWidth: 472, maxHeight: 304, cropFocus: CENTER) {
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
        const { title, excerpt, uri, featuredImage, id } = node
        const imageSourcesCategoryCards = [
          // featuredImage.xsSm.childImageSharp.fluid,
          {
            ...featuredImage.xsSm.childImageSharp.fluid,
            media: `(max-width: 767px)`,
          },
          // featuredImage.mdLgXl.childImageSharp.fluid,
          {
            ...featuredImage.mdLgXl.childImageSharp.fluid,
            media: `(min-width: 768px)`,
          },
        ]
        return (
          <Link className="category-cards card-shadow" to={uri} key={id}>
            {featuredImage && (
              <Img
                fluid={imageSourcesCategoryCards}
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
