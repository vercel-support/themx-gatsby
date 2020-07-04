import React from "react"
import { Link } from "gatsby"
import Typography from "../typography/typography"
import Img from "gatsby-image"

const PostCardCat = ({ props }) => {
  return (
    <section className="container grid grid-3x2 pb-60">
      {props.map(edge => {
        const { title, uri, featuredImage, countryMeta, id } = edge.nodes
        const imageSourcesSixPosts = [
          featuredImage.imageFile.childImageSharp.fixed,
          {
            ...featuredImage.landscape.childImageSharp.fixed,
            media: `(min-width: 768px)`,
          },
        ]
        return (
          <article
            className="title-card position-relative rounded"
            key={`${id}TitleCard`}
          >
            {console.log("joehai")}
            <Link to={uri}>
              <h2
                className="title-card-title position-absolute"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              {featuredImage && (
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

export default PostCardCat
