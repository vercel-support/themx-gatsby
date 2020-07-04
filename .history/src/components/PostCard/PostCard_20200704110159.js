import React from "react"
import { Link } from "gatsby"
import Typography from "../typography/typography"
import Img from "gatsby-image"
import "./PostCard.scss"

const PostCard = ({ props }) => {
  return (
    <section className="container grid grid-3x2 pb-60">
			<div className="row">x
      {props.map(edge => {
        const { title, uri, featuredImage, categories, id } = edge.node
        const imageSourcesSixPosts = [
          featuredImage.portrait != undefined &&
            (featuredImage.portrait.childImageSharp.fixed,
            {
              ...featuredImage.landscape.childImageSharp.fixed,
              media: `(min-width: 768px)`,
            }),
        ]
        return (
          <article
            className="title-card position-relative rounded"
            key={`${id}TitleCard`}
          >
            <Link to={uri} className="d-block">
              <Typography className="title-card-category position-absolute rounded bg-primary">
                {categories.nodes[0].name}
              </Typography>
              <h2
                className="title-card-title position-absolute"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              {featuredImage.portrait != undefined && (
                <Img
                  fixed={imageSourcesSixPosts}
                  alt={title}
                  className="title-card-image rounded"
                />
              )}
            </Link>
          </article>
        )
      })}
			$grid-gutter-width
    </section>
  )
}

export default PostCard
