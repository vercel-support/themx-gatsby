import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "./categoryCards.scss"

export default function CategoryCards() {
  const data = useStaticQuery(graphql`
    query CategoryCardsQuery {
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
  `)

  return (
    <section>
			{data.wpgraphql.posts.nodes(node => {
			<Link>
			{node.featuredImage.imageFile && (
				<Img
					sizes={{
						...node.featuredImage.imageFile.childImageSharp.fluid,
						aspectRatio: 3 / 2,
					}}
					alt={node.title}
					className="title-card-image rounded"
				/>
			)}
			</Link>
    </section>
  )
}

{/* <span>{data.wpgraphql.posts.nodes[0].title}</span> */}