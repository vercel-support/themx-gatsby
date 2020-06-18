import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageDivider from "../components/pageDivider/pageDivider"
import Img from "gatsby-image"
import "../components/homePageComponents/titleCards/titleCards.scss"
import "../components/homePageComponents/aboutUs/aboutUs.scss"
import Typography from "../components/typography/typography"
// import CategoryCards from "../components/homePageComponents/categoryCards/categoryCards"
// import FeaturedPost from "../components/homePageComponents/featuredPost/featuredPost"

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
      <section className="container grid grid-3x2 py-60">
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

      <section className="container p-0 py-60">
        <div className="grid about-us">
          <div
            className="about-us-text"
            dangerouslySetInnerHTML={{ __html: aboutUs.content }}
          />
          <Img
            fluid={aboutUs.featuredImage.imageFile.childImageSharp.fluid}
            alt={aboutUs.featuredImage.altText}
            className="about-us-image clip-svg"
          />
          <svg width="50" height="50">
            <defs>
              <clipPath id="myClip">
                <elipse cx="200" cy="80" rx="100" ry="50" />
                {/* <polygon points="450,10 500,200 600,100" />
                <polygon points="150,10 100,200 300,100" /> */}
              </clipPath>
            </defs>
          </svg>{" "}
        </div>
      </section>
      {/* <FeaturedPost /> */}
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
              fluid(maxWidth: 1920, maxHeight: 720) {
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
