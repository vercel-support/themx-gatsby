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
                  fixed(width: 540, height: 300, cropFocus: CENTER) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
              mdLgXl: imageFile {
                childImageSharp {
                  fixed(width: 472, height: 300, cropFocus: CENTER) {
                    ...GatsbyImageSharpFixed_withWebp
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
          featuredImage.xsSm.childImageSharp.fixed,
          {
            ...featuredImage.xsSm.childImageSharp.fixed,
            media: `(max-width: 767px)`,
            key: `${id}xsSmCategoryCards`,
          },
          featuredImage.mdLgXl.childImageSharp.fixed,
          {
            ...featuredImage.mdLgXl.childImageSharp.fixed,
            media: `(min-width: 768px)`,
            key: `${id}mdLgXlCategoryCards`,
          },
        ]
        return (
          <Link className="category-cards card-shadow" to={uri} key={id}>
            {featuredImage && (
              <Img
                fixed={imageSourcesCategoryCards}
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
