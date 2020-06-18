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
    frontPage.featuredImage.portrait.childImageSharp.fluid,
    {
      ...frontPage.featuredImage.landscape.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ]

  const imageSourcesAboutUs = [
    aboutUs.featuredImage.imageFile.childImageSharp.fluid,
    {
      ...aboutUs.featuredImage.imageFile.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ]
  return (
    <Layout>
      <SEO title={frontPage.title} />
      {console.log(imageSourcesHeader)}
      <Img fluid={imageSourcesHeader} alt={frontPage.title} className="" />
      <PageDivider component="h2">Onze laatste artikelen</PageDivider>
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
          portrait: imageFile {
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
    }
  }
`
