import React from "react"
import { Link } from "gatsby"
import Typography from "../typography/typography"
import Img from "gatsby-image"

const PostCard = ({ props }) => {
  return (
    <section className="container grid grid-3x2 pb-60">
      {props.map(edge => {
        const {featuredImage ? ({
          title,
          uri,
          featuredImage,
          categories,
          id,
			} = edge.node) : ({
				name,
				uri,
				countryMeta,
				id,
			} = edge.nodes)}
        const imageSourcesSixPosts = [
          featuredImage.imageFile.childImageSharp.fixed,
          {
            ...featuredImage.landscape.childImageSharp.fixed,
            media: `(min-width: 768px)`,
          },
        ]
        // : [
        //     countryMeta.featuredImageCategory.imageFile.childImageSharp.fixed,
        //     {
        //       ...countryMeta.featuredImageCategory.landscape.childImageSharp
        //         .fixed,
        //       media: `(min-width: 768px)`,
        //     },
        //   ]
        return (
          <article
            className="title-card position-relative rounded"
            key={`${id}TitleCard`}
          >
            {console.log("joehai")}
            <Link to={uri}>
              <Typography className="title-card-category position-absolute rounded bg-primary">
                {categories.nodes[0].name}
              </Typography>
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

export default PostCard
