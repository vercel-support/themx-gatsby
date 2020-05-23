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
  const imageSources = [
    page.featuredImage.portrait.childImageSharp.fluid,
    {
      ...page.featuredImage.portrait.childImageSharp.fluid,
      media: `(max-width: 768px)`,
    },
    page.featuredImage.landscape.childImageSharp.fluid,
    {
      ...page.featuredImage.landscape.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ]
  return (
    <Layout>
      <SEO title={title} />
      <Img fluid={imageSources} alt={title} />
      <PageDivider component="h2">Onze laatste artikelen</PageDivider>
      <div className="container grid grid-height-300">
        {edges.map(edge => {
          const { title, uri, featuredImage, categories, id } = edge.node
          const imageSourcesSixPosts = [
            featuredImage.xs.childImageSharp.fixed,
            {
              ...featuredImage.xs.childImageSharp.fixed,
              media: `(max-width: 575px)`,
            },
            featuredImage.sm.childImageSharp.fixed,
            {
              ...featuredImage.sm.childImageSharp.fixed,
              media: `(max-width: 767px)`,
            },
            featuredImage.md.childImageSharp.fixed,
            {
              ...featuredImage.md.childImageSharp.fixed,
              media: `(max-width: 991px)`,
            },
            featuredImage.lg.childImageSharp.fixed,
            {
              ...featuredImage.lg.childImageSharp.fixed,
              media: `(max-width: 1199px)`,
            },
            featuredImage.xl.childImageSharp.fixed,
            {
              ...featuredImage.xl.childImageSharp.fixed,
              media: `(min-width: 1200px)`,
            },
          ]
          return (
            <Link to={uri} className="title-card position-relative rounded">
              <Typography
                key={id}
                className="title-card-category position-absolute rounded bg-primary"
              >
                {categories.nodes[0].name}
              </Typography>
              <h2
                key={uri}
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
      <CategoryCards className="pb-60" />
      <FeaturedPost className="py-60" />
    </Layout>
  )
}

export default FrontPage

export const frontPageQuery = graphql`
  query GET_FRONTPAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        uri
        id
        featuredImage {
          sourceUrl
          portrait: imageFile {
            childImageSharp {
              fluid(
                maxWidth: 768
                maxHeight: 768
                sizes: "(max-width: 768px) 100vw, 100vw"
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          landscape: imageFile {
            childImageSharp {
              fluid(
                maxWidth: 2560
                maxHeight: 512
                sizes: "(max-width: 1280px) 100vw, (max-width: 2560px) 100vw, 100vw"
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      posts(first: 6) {
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
            xs: featuredImage {
              altText
              sourceUrl
              sizes
              imageFile {
                childImageSharp {
                  fixed(width: 540, height: 300) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
            sm: featuredImage {
              altText
              sourceUrl
              sizes
              imageFile {
                childImageSharp {
                  fixed(width: 540, height: 300) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
            md: featuredImage {
              altText
              sourceUrl
              sizes
              imageFile {
                childImageSharp {
                  fixed(width: 352, height: 300) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
            lg: featuredImage {
              altText
              sourceUrl
              sizes
              imageFile {
                childImageSharp {
                  fixed(width: 472, height: 300) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
            xl: featuredImage {
              altText
              sourceUrl
              sizes
              imageFile {
                childImageSharp {
                  fixed(width: 370, height: 300) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
            title(format: RENDERED)
          }
        }
      }
    }
  }
`
