import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageDivider from "../components/pageDivider/pageDivider"
import Img from "gatsby-image"
import "../components/homePageComponents/titleCards/titleCards.scss"
import Typography from "../components/typography/typography"
import CategoryCards from "../components/homePageComponents/categoryCards/categoryCards"
import FeaturedPost from "../components/homePageComponents/featuredPost/featuredPost"

const FrontPage = props => {
  const {
    data: {
      wpgraphql: { page, posts },
    },
  } = props
  const { title } = page
  const { edges } = posts
  const imageSourcesHeader = [
    page.featuredImage.portrait.childImageSharp.fluid,
    {
      ...page.featuredImage.portrait.childImageSharp.fluid,
      media: `(max-width: 767px)`,
      key: `portraitHomeHeader`,
    },

    page.featuredImage.landscape.childImageSharp.fluid,
    {
      ...page.featuredImage.landscape.childImageSharp.fluid,
      media: `(min-width: 768px)`,
      key: `landscapeHomeHeader`,
    },
  ]
  return (
    <Layout>
      <SEO title={title} />
      <Img fluid={imageSourcesHeader} alt={title} className="" />
      <PageDivider component="h2">Onze laatste artikelen</PageDivider>
      <div className="container grid grid-height-300">
        {edges.map(edge => {
          const { title, uri, featuredImage, categories, id } = edge.node
          const imageSourcesSixPosts = [
            // featuredImage.xsSm.childImageSharp.fixed,
            {
              ...featuredImage.xsSm.childImageSharp.fixed,
              media: `(max-width: 767px)`,
              key: `${id}xsSmSixPosts`,
            },
            // featuredImage.mdLgXl.childImageSharp.fixed,
            {
              ...featuredImage.mdLgXl.childImageSharp.fixed,
              media: `(min-width: 768px)`,
              key: `${id}mdLgXlSixPosts`,
            },
          ]
          return (
            <Link
              to={uri}
              key={`${id}TitleCard`}
              className="title-card position-relative rounded"
            >
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
          )
        })}
      </div>
      <PageDivider component="h2">Budget</PageDivider>
      <CategoryCards />
      <FeaturedPost />
      <PageDivider component="h2">Henks</PageDivider>
      <CategoryCards />
    </Layout>
  )
}

export default FrontPage

export const frontPageQuery = graphql`
query GET_FRONTPAGE($id: ID!, $first_category_block: String) {
	wpgraphql {
		page(id: $id) {
			homepage_custom_meta_box_settings {
				firstCategoryBlock {
					name
				}
			}			
			title
			content
			uri
			id
			featuredImage {
				sourceUrl
				portrait: imageFile {
					childImageSharp {
						fluid(maxWidth: 757, maxHeight: 300) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
          landscape: imageFile {
						childImageSharp {
							fluid(maxWidth: 2560, maxHeight: 500) {
								...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      latestPosts: posts(first: 6) {
				edges {
          node {
						categories(
							where: { shouldOutputInFlatList: true, childless: true }
							) {
								nodes {
									name
								}
							}
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
            title(format: RENDERED)
          }
        }
      }
      posts(first: 3, where: { categoryName: "Budget" } {
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
	`
