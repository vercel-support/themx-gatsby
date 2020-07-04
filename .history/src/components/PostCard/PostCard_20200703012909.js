import React from "react"
import { Link } from "gatsby"
import Typography from "../typography/typography"
import Img from "gatsby-image"

const PostCard = ({ props }) => {
  return (
    <section className="container grid grid-3x2 pb-60">
      {props.edges.map(edge => {
        const { title, uri, featuredImage, categories, id } = edge
        const imageSourcesSixPosts = [
          featuredImage &&
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
            <Link to={uri}>
              <Typography className="title-card-category position-absolute rounded bg-primary">
                {categories.nodes[0].name}
              </Typography>
              <h2
                className="title-card-title position-absolute"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              {featuredImage.portrait && (
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
