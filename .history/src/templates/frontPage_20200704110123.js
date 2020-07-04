import React from "react"
import Img from "gatsby-image"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageDivider from "../components/pageDivider/pageDivider"
import "../components/homePageComponents/titleCards/titleCards.scss"
import "../components/homePageComponents/aboutUs/aboutUs.scss"
import Typography from "../components/typography/typography"
import FeaturedPost from "../components/homePageComponents/featuredPost/featuredPost"
import PostCard from "../components/PostCard/PostCard"

const FrontPage = props => {
  const {
    data: {
      wpgraphql: { frontPage, posts, aboutUs, europeCat, asiaCat, oceaniaCat },
    },
  } = props

  const imageSourcesHeader = [
    frontPage.featuredImage.imageFile &&
      (frontPage.featuredImage.imageFile.childImageSharp.fluid,
      {
        ...frontPage.featuredImage.landscape.childImageSharp.fluid,
        media: `(min-width: 768px)`,
      }),
  ]

  const imageSourcesAboutUs = [
    aboutUs.featuredImage.portrait &&
      (aboutUs.featuredImage.landscape.childImageSharp.fluid,
      {
        ...aboutUs.featuredImage.landscape.childImageSharp.fluid,
        media: `(min-width: 768px)`,
      }),
  ]

  return (
    <Layout>
      <SEO title={frontPage.title} />
      {frontPage.featuredImage.imageFile && (
        <Img fluid={imageSourcesHeader} alt={frontPage.title} />
      )}
      <PageDivider component="h2">Onze laatste artikelen</PageDivider>

      <PostCard props={posts.edges} />

      <section className="container-fluid py-60">
        <div className="about-us">
          <div className="row align-items-center">
            <div className="col-12 col-md-5">
              <div
                className="about-us-text"
                dangerouslySetInnerHTML={{
                  __html: `${aboutUs.content}`,
                }}
              />
            </div>
            <div className="col-12 col-md-7">
              {aboutUs.featuredImage.portrait && (
                <Img
                  fluid={imageSourcesAboutUs}
                  alt={aboutUs.featuredImage.altText}
                  className="about-us-image"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <FeaturedPost />
      {console.log(imageSourcesAboutUs)}
      <section className="container py-60">
        <div className="d-flex justify-content-center justify-content-md-between flex-wrap">
          <Link to={europeCat.uri}>
            <Typography component="h3" className="text-center">
              {europeCat.name}
            </Typography>
            {europeCat.countryMeta.featuredImageCategory.imageFile && (
              <Img
                fixed={
                  europeCat.countryMeta.featuredImageCategory.imageFile
                    .childImageSharp.fixed
                }
              />
            )}
          </Link>
          <Link to={asiaCat.uri}>
            <Typography component="h3" className="text-center">
              {asiaCat.name}
            </Typography>
            {asiaCat.countryMeta.featuredImageCategory.imageFile && (
              <Img
                fixed={
                  asiaCat.countryMeta.featuredImageCategory.imageFile
                    .childImageSharp.fixed
                }
              />
            )}
          </Link>
          <Link to={oceaniaCat.uri}>
            <Typography component="h3" className="text-center">
              {oceaniaCat.name}
            </Typography>
            {oceaniaCat.countryMeta.featuredImageCategory.imageFile && (
              <Img
                fixed={
                  oceaniaCat.countryMeta.featuredImageCategory.imageFile
                    .childImageSharp.fixed
                }
              />
            )}
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
      frontPage: page(id: $id) {
        content
        id
        title
        uri
        featuredImage {
          sourceUrl
          id
          imageFile {
            childImageSharp {
              fluid(maxWidth: 757, maxHeight: 300) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
          landscape: imageFile {
            childImageSharp {
              fluid(maxWidth: 2560, maxHeight: 500) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
      aboutUs: page(idType: URI, id: "about-us-homepage") {
        content(format: RENDERED)
        id
        title(format: RENDERED)
        uri
        featuredImage {
          altText
          sourceUrl
          portrait: imageFile {
            childImageSharp {
              fluid(maxWidth: 560, maxHeight: 440) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
          landscape: imageFile {
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
            featuredImage {
              altText
              sourceUrl
              sizes
              portrait: imageFile {
                childImageSharp {
                  fixed(width: 540, height: 300, cropFocus: CENTER) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                  }
                }
              }
              landscape: imageFile {
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
      europeCat: category(idType: NAME, id: "Europa") {
        uri
        name
        countryMeta {
          featuredImageCategory {
            sourceUrl
            imageFile {
              childImageSharp {
                fixed(width: 300, height: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
      asiaCat: category(idType: NAME, id: "Azië") {
        uri
        name
        countryMeta {
          featuredImageCategory {
            sourceUrl
            imageFile {
              childImageSharp {
                fixed(width: 300, height: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
      oceaniaCat: category(idType: NAME, id: "Oceanië") {
        uri
        name
        countryMeta {
          featuredImageCategory {
            sourceUrl
            imageFile {
              childImageSharp {
                fixed(width: 300, height: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
