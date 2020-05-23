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
    page.featuredImage.xs.childImageSharp.fluid,
    // {
    //   ...page.featuredImage.xs.childImageSharp.fluid,
    //   media: `(max-width: 575px)`,
    // },

    page.featuredImage.sm.childImageSharp.fluid,
    // {
    //   ...page.featuredImage.sm.childImageSharp.fluid,
    //   media: `(max-width: 767px)`,
    // },

    page.featuredImage.md.childImageSharp.fluid,
    // {
    //   ...page.featuredImage.md.childImageSharp.fluid,
    //   media: `(max-width: 991px)`,
    // },

    page.featuredImage.lg.childImageSharp.fluid,
    // {
    //   ...page.featuredImage.lg.childImageSharp.fluid,
    //   media: `(max-width: 1199px)`,
    // },

    page.featuredImage.xl.childImageSharp.fluid,
    // {
    //   ...page.featuredImage.xl.childImageSharp.fluid,
    //   media: `(max-width: 1919 px)`,
    // },

    page.featuredImage.ret.childImageSharp.fluid,
    // {
    //   ...page.featuredImage.ret.childImageSharp.fluid,
    //   media: `(min-width: 1920px)`,
    // },
  ]
  return (
    <Layout>
      <SEO title={title} />
      <Img fluid={imageSourcesHeader} alt={title} />
      <PageDivider component="h2">Onze laatste artikelen</PageDivider>
      <div className="container grid grid-height-300">
        {edges.map(edge => {
          const { title, uri, featuredImage, categories, id } = edge.node
          const imageSourcesSixPosts = [
            featuredImage.xsSm.childImageSharp.fixed,
            {
              ...featuredImage.xsSm.childImageSharp.fixed,
              media: `(max-width: 767px)`,
            },
            featuredImage.mdLgXl.childImageSharp.fixed,
            {
              ...featuredImage.mdLgXl.childImageSharp.fixed,
              media: `(min-width: 768px)`,
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
          xsSm: imageFile {
            childImageSharp {
              fluid(maxWidth: 767, maxHeight: 767, srcSetBreakpoints: 767) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        featuredImage {
          sourceUrl
          md: imageFile {
            childImageSharp {
              fluid(maxWidth: 991, maxHeight: 512, srcSetBreakpoints: 991) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        featuredImage {
          sourceUrl
          lg: imageFile {
            childImageSharp {
              fluid(maxWidth: 1199, maxHeight: 512, srcSetBreakpoints: 1199) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        featuredImage {
          sourceUrl
          xl: imageFile {
            childImageSharp {
              fluid(maxWidth: 1919, maxHeight: 512, srcSetBreakpoints: 1919) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        featuredImage {
          sourceUrl
          ret: imageFile {
            childImageSharp {
              fluid(maxWidth: 2560, maxHeight: 512, srcSetBreakpoints: 2560) {
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
              xsSm: imageFile {
                childImageSharp {
                  fixed(width: 540, height: 300, cropFocus: CENTER) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
            featuredImage {
              altText
              sourceUrl
              sizes
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
