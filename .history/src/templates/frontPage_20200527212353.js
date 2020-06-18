import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageDivider from "../components/pageDivider/pageDivider"
import Img from "gatsby-image"
import "../components/homePageComponents/titleCards/titleCards.scss"
import Typography from "../components/typography/typography"
// import CategoryCards from "../components/homePageComponents/categoryCards/categoryCards"
import FeaturedPost from "../components/homePageComponents/featuredPost/featuredPost"

const FrontPage = props => {
  const {
    data: {
      wpgraphql: { page, posts, aboutUs },
    },
  } = props
  const { title } = page
  const { edges } = posts
  const imageSourcesHeader = [
    {
      ...page.featuredImage.portrait.childImageSharp.fluid,
      media: `(max-width: 767px)`,
    },

    {
      ...page.featuredImage.landscape.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ]
  return (
    <Layout>
      <SEO title={title} />
      <Img fluid={imageSourcesHeader} alt={title} className="" />
      <PageDivider component="h2">Onze laatste artikelen</PageDivider>
      <section className="container grid grid-height-300">
        {edges.map(edge => {
          const { title, uri, featuredImage, categories, id } = edge.node
          const imageSourcesSixPosts = [
            {
              ...featuredImage.xsSm.childImageSharp.fixed,
              media: `(max-width: 767px)`,
            },
            {
              ...featuredImage.mdLgXl.childImageSharp.fixed,
              media: `(min-width: 768px)`,
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
      </section>

      <section>
        <div className="d-flex">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </section>

      <FeaturedPost />
    </Layout>
  )
}

export default FrontPage

export const frontPageQuery = graphql`
  query GET_FRONTPAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        content
        id
        title
        uri
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
      aboutUs: page(idType: DATABASE_ID, id: "25944") {
        content(format: RENDERED)
        id
        title(format: RENDERED)
        uri
        featuredImage {
          altText
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(maxWidth: 1920, maxHeight: 700) {
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
    }
  }
`
