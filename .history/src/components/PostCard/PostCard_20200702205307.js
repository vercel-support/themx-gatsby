import React from "react"
import { Link } from "gatsby"
import Typography from "../typography/typography"
import Img from "gatsby-image"

const PostCard = ({
  arrayCard,
  titleCard,
  uriCard,
  imageCard,
  categoriesCard,
  idCard,
}) => {
  return (
    <section className="container grid grid-3x2 pb-60">
      {arrayCard.map(value => {
        const {
          titleCard,
          uriCard,
          imageCard,
          categoriesCard,
          idCard,
        } = edge.node
        const imageSourcesSixPosts = [
          imageCard &&
            (imageCard.portrait.childImageSharp.fixed,
            {
              ...imageCard.landscape.childImageSharp.fixed,
              media: `(min-width: 768px)`,
            }),
        ]
        return (
          <article
            className="title-card position-relative rounded"
            key={`${idCard}TitleCard`}
          >
            <Link to={uriCard}>
              categoriesCard &&{" "}
              {
                <Typography className="title-card-category position-absolute rounded bg-primary">
                  {categoriesCard.nodes[0].name}
                </Typography>
              }
              <h2
                className="title-card-title position-absolute"
                dangerouslySetInnerHTML={{ __html: titleCard }}
              />
              {imageCard && (
                <Img
                  fixed={imageSourcesSixPosts}
                  alt={titleCard}
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
