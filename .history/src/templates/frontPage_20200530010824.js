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
      wpgraphql: {
        page,
        posts,
        aboutUs,
        northAmericaPng,
        southAmericaPng,
        europePng,
        asiaPng,
        oceaniaPng,
        africaPng,
        nordAmericaCat,
        southAmericaCat,
        europeCat,
        asiaCat,
        oceaniaCat,
        africaCat,
      },
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

      <section className="container-fluid p-0 py-60">
        <div className="grid about-us">
          <div
            className="about-us-text"
            dangerouslySetInnerHTML={{
              __html: `${aboutUs.content}`,
            }}
          />
          <Img
            fluid={aboutUs.featuredImage.imageFile.childImageSharp.fluid}
            alt={aboutUs.featuredImage.altText}
            className="about-us-image"
          />
        </div>
      </section>
      {/* <FeaturedPost /> */}
      <section>
        <div>
          <h3></h3>
          <Img fluid={northAmericaPng.imageFile.childImageSharp.fluid} />
        </div>
      </section>
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
      northAmericaPng: mediaItemBy(mediaItemId: 25948) {
        id
        sourceUrl
        altText
        imageFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      southAmericaPng: mediaItemBy(mediaItemId: 25949) {
        id
        sourceUrl
        altText
        imageFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      europePng: mediaItemBy(mediaItemId: 25950) {
        id
        sourceUrl
        altText
        imageFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      asiaPng: mediaItemBy(mediaItemId: 25951) {
        id
        sourceUrl
        altText
        imageFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      oceaniaPng: mediaItemBy(mediaItemId: 25952) {
        id
        sourceUrl
        altText
        imageFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      africaPng: mediaItemBy(mediaItemId: 25953) {
        id
        sourceUrl
        altText
        imageFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      nordAmericaCat: category(idType: NAME, id: "Noord-Amerika") {
        uri
      }
      southAmericaCat: category(idType: NAME, id: "Zuid-Amerika") {
        uri
      }
      europeCat: category(idType: NAME, id: "Europa") {
        uri
      }
      asiaCat: category(idType: NAME, id: "Azië") {
        uri
      }
      oceaniaCat: category(idType: NAME, id: "Oceanië") {
        uri
      }
      africaCat: category(idType: NAME, id: "Afrika") {
        uri
      }
    }
  }
`
