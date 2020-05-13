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
      wpgraphql: { page, posts, mediaItemBy },
    },
  } = props
  const { title } = page
  const { edges } = posts
  return (
    <Layout>
      <SEO title={title} />
      <Img
        fluid={{
          ...mediaItemBy.imageFile.childImageSharp.fluid,
        }}
        alt={title}
      />
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
      mediaItemBy(mediaItemId: 25908) {
        altText
        sourceUrl
        imageFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      page(id: $id) {
        title
        content
        uri
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
