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
        europePng,
        asiaPng,
        oceaniaPng,
        europeCat,
        asiaCat,
        oceaniaCat,
      },
    },
  } = props
  const { title } = page
  const { edges } = posts
  const imageSourcesHeader = [
    page.portrait.imageFile.childImageSharp.fluid,
    {
      ...page.landscape.imageFile.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ]
  const imageSourcesAboutUs = [
    {
      ...aboutUs.featuredImage.imageFile.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ]
  return (
    <Layout>
      {/* {console.log(page.landscape)} */}
      {/* {console.log(page.featuredImage.landscape.childImageSharp.fluid)} */}
      <SEO title={title} />
      <Img fluid={imageSourcesHeader} alt={title} className="" />
      <PageDivider component="h2">Onze laatste artikelen</PageDivider>
      <section className="container grid grid-3x2 pb-60">
        {edges.map(edge => {
          const { title, uri, featuredImage, categories, id } = edge.node
          const imageSourcesSixPosts = [
            {
              ...xsSm.imageFile.childImageSharp.fixed,
              media: `(max-width: 767px)`,
            },
            {
              ...mdLgXl.imageFile.childImageSharp.fixed,
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

      <section className="container-fluid py-60">
        <div className="grid about-us">
          <div
            className="about-us-text"
            dangerouslySetInnerHTML={{
              __html: `${aboutUs.content}`,
            }}
          />
          {/* <Img
            fluid={imageSourcesAboutUs}
            alt={aboutUs.featuredImage.altText}
            className="about-us-image"
          /> */}
        </div>
      </section>
      {/* <FeaturedPost /> */}
      <section className="container py-60">
        <div className="d-flex justify-content-between">
          <Link to={europeCat.uri}>
            <Typography component="h3" className="text-center">
              {europeCat.name}
            </Typography>
            {/* <Img fixed={europePng.imageFile.childImageSharp.fixed} /> */}
          </Link>
          <Link to={asiaCat.uri}>
            <Typography component="h3" className="text-center">
              {asiaCat.name}
            </Typography>
            {/* <Img fixed={asiaPng.imageFile.childImageSharp.fixed} /> */}
          </Link>
          <Link to={oceaniaCat.uri}>
            <Typography component="h3" className="text-center">
              {oceaniaCat.name}
            </Typography>
            {/* <Img fixed={oceaniaPng.imageFile.childImageSharp.fixed} /> */}
          </Link>
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
        portrait: featuredImage {
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(maxWidth: 757, maxHeight: 300) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        landscape: featuredImage {
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(maxWidth: 2560, maxHeight: 500) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
            xsSm: featuredImage {
              altText
              sourceUrl
              sizes
              imageFile {
                childImageSharp {
                  fixed(width: 540, height: 300, cropFocus: CENTER) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                  }
                }
              }
            }
            mdLgXl: featuredImage {
              imageFile {
                childImageSharp {
                  fixed(width: 472, height: 300, cropFocus: CENTER) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                  }
                }
              }
            }
            title(format: RENDERED)
          }
        }
      }
      europePng: mediaItemBy(mediaItemId: 25950) {
        id
        sourceUrl
        altText
        imageFile {
          childImageSharp {
            fixed(width: 125, height: 125) {
              ...GatsbyImageSharpFixed_withWebp_tracedSVG
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
            fixed(width: 125, height: 125) {
              ...GatsbyImageSharpFixed_withWebp_tracedSVG
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
            fixed(width: 125, height: 125) {
              ...GatsbyImageSharpFixed_withWebp_tracedSVG
            }
          }
        }
      }
      europeCat: category(idType: NAME, id: "Europa") {
        uri
        name
      }
      asiaCat: category(idType: NAME, id: "Azië") {
        uri
        name
      }
      oceaniaCat: category(idType: NAME, id: "Oceanië") {
        uri
        name
      }
    }
  }
`
