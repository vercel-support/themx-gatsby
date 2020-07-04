import React from "react"
import {Link} from "gatsby"

const PostCard - ({props}) => {
	return (
		<section className="container grid grid-3x2 pb-60">
			{props.edges.map(edge => {
				const { title, uri, featuredImage, categories, id } = edge.node
				const imageSourcesSixPosts = [
					featuredImage.xsSm &&
					(featuredImage.xsSm.childImageSharp.fixed,
					{
						...featuredImage.mdLgXl.childImageSharp.fixed,
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
							{featuredImage.xsSm && (
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
