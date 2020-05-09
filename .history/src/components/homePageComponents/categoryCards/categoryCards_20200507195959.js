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
            date(formatString: "DD MM YYYY", locale: "nl")
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
        const publishDate = moment(date).format("DD/MM/YYYY")
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
            <p dangerouslySetInnerHTML={{ __html: excerpt }} />
            <span>{publishDate}</span>
            <span>Lees meer...</span>
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
