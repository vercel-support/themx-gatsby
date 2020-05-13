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
      wpgraphql: { page, pageBy, posts },
    },
  } = props
  const { title } = page
  const { edges } = posts
  const imageSources = [
    pageBy.imageFile.childImageSharp.fluid,
    {
      ...pageBy.imageFile.childImageSharp.fluid,
      media: `(max-width: 640px)`,
    },
    page.imageFile.childImageSharp.fluid,
    {
      ...page.imageFile.childImageSharp.fluid,
      media: `(min-width: 640px)`,
    },
  ]
  return (
    <Layout>
      <SEO title={title} />
      <div>
        <Img fluid={imageSources} alt={title} />
        {console.log(imageSources)}
      </div>
      <PageDivider component="h2">Onze laatste artikelen</PageDivider>
      <div className="container grid">
        {edges.map(edge => {
          const { title, uri, featuredImage, categories } = edge.node
          return (
            <Link to={uri} className="title-card position-relative rounded">
              <Typography className="title-card-category position-absolute rounded bg-primary">
                {categories.nodes[0].name}
              </Typography>
              <h2
                key={uri}
                className="title-card-title position-absolute"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              {featuredImage.imageFile && (
                <Img
                  sizes={{
                    ...featuredImage.imageFile.childImageSharp.fluid,
                    aspectRatio: 3 / 2,
                  }}
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
      <FeaturedPost />
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
        featuredImage {
          sourceUrl
          imageFile {
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
      pageBy(id: $id) {
        featuredImage {
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(
                maxWidth: 640
                maxHeight: 640
                sizes: "(max-width: 640px) 100vw, 100vw"
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
            featuredImage {
              altText
              sourceUrl
              sizes
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid_withWebp
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
