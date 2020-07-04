import React from "react"
import { Link } from "gatsby"
import Typography from "../typography/typography"
import Img from "gatsby-image"
import "./PostCard.scss"

const PostCard = ({ props }) => {
  return (
    <section className="container grid grid-3x2 pb-60">
      {props.map(edge => {
        const { title, uri, featuredImage, categories, id } = edge.node
        const imageSourcesSixPosts = [
          featuredImage.imageFile != undefined &&
            (featuredImage.imageFile.childImageSharp.fixed,
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
            <Link to={uri} className=d-block>
              <Typography className="title-card-category position-absolute rounded bg-primary top-0 right-0 bottom-0 left-0">
                {categories.nodes[0].name}
              </Typography>
              <h2
                className="title-card-title position-absolute"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              {featuredImage.imageFile != undefined && (
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
    </section>
  )
}

export default PostCard
