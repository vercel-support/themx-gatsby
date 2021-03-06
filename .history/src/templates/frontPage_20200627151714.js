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

const FrontPage = props => {
  const {
    data: {
      wpgraphql: {
        frontPage,
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

  const imageSourcesHeader = [
    frontPage.featuredImage.imageFile &&
      (frontPage.featuredImage.imageFile.childImageSharp.fluid,
      {
        ...frontPage.featuredImage.landscape.childImageSharp.fluid,
        media: `(min-width: 768px)`,
      }),
  ]

  const imageSourcesAboutUs = [
    aboutUs.featuredImage.imageFile &&
      (aboutUs.featuredImage.imageFile.childImageSharp.fluid,
      {
        ...aboutUs.featuredImage.imageFile.childImageSharp.fluid,
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
      <section className="container grid grid-3x2 pb-60">
        {posts.edges.map(edge => {
          const { title, uri, featuredImage, categories, id } = edge.node
          const imageSourcesSixPosts = [
            featuredImage.xsSm &&
              (featuredImage.xsSm.childImageSharp.fixed,
              {
                ...featuredImage.mdLgXl.childImageSharp.fixed,
                media: `(min-width: 768px)`,
              }),
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
              {featuredImage.xsSm && (
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
          {aboutUs.featuredImage.imageFile && (
            <Img
              fluid={imageSourcesAboutUs}
              alt={aboutUs.featuredImage.altText}
              className="about-us-image"
            />
          )}
        </div>
      </section>

      <FeaturedPost />

      <section className="container py-60">
        <div className="d-flex justify-content-between">
          <Link to={europeCat.uri}>
            <Typography component="h3" className="text-center">
              {europeCat.name}
            </Typography>
            {europeCat.countryMeta.featuredImage.imageFile && (
              <Img
                fixed={
                  europeCat.countryMeta.featuredImage.imageFile.childImageSharp
                    .fixed
                }
              />
            )}
          </Link>
          <Link to={asiaCat.uri}>
            <Typography component="h3" className="text-center">
              {asiaCat.name}
            </Typography>
            {asiaPng.imageFile && (
              <Img fixed={asiaPng.imageFile.childImageSharp.fixed} />
            )}
          </Link>
          <Link to={oceaniaCat.uri}>
            <Typography component="h3" className="text-center">
              {oceaniaCat.name}
            </Typography>
            {oceaniaPng.imageFile && (
              <Img fixed={oceaniaPng.imageFile.childImageSharp.fixed} />
            )}
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default FrontPage

//livegang images aanpassen: .nl -> 39331, 30452, 37212, 30362 dev -> 25944, 47236, 47232, 47240

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
            featuredImage {
              altText
              sourceUrl
              sizes
              xsSm: imageFile {
                childImageSharp {
                  fixed(width: 540, height: 300, cropFocus: CENTER) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                  }
                }
              }
              mdLgXl: imageFile {
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
      europePng: mediaItemBy(mediaItemId: 47236) {
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
      asiaPng: mediaItemBy(mediaItemId: 47232) {
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
      oceaniaPng: mediaItemBy(mediaItemId: 47240) {
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
        countryMeta {
          featuredImage {
            sourceUrl
            imageFile {
              childImageSharp {
                fixed(width: 540, height: 300, cropFocus: CENTER) {
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
          featuredImage {
            sourceUrl
            imageFile {
              childImageSharp {
                fixed(width: 540, height: 300, cropFocus: CENTER) {
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
          featuredImage {
            sourceUrl
            imageFile {
              childImageSharp {
                fixed(width: 540, height: 300, cropFocus: CENTER) {
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
