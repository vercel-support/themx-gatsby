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
  // const { title } = page
  const { edges } = posts
  // const imageSourcesHeader = [
  //   page.featuredImage.portrait.childImageSharp.fluid,
  //   {
  //     ...page.featuredImage.landscape.childImageSharp.fluid,
  //     media: `(min-width: 768px)`,
  //   },
  // ]

  // const imageSourcesAboutUs = [
  //   aboutUs.featuredImage.imageFile.childImageSharp.fluid,
  //   {
  //     ...aboutUs.featuredImage.imageFile.childImageSharp.fluid,
  //     media: `(min-width: 768px)`,
  //   },
  // ]
  return (
    <Layout>
      <SEO title={page.title} />
      {console.log(page.featuredImage)}
      {/* <Img fluid={page.featuredImage.portrait.childImageSharp.fluid} /> */}
      {/* <Img fluid={imageSourcesHeader} alt={page.title} className="" /> */}
      <PageDivider component="h2">Onze laatste artikelen</PageDivider>
      <section className="container grid grid-3x2 pb-60">
        {edges.map(edge => {
          const { title, uri, featuredImage, categories, id } = edge.node
          // const imageSourcesSixPosts = [
          //   featuredImage.xsSm.childImageSharp.fixed,
          //   {
          //     ...featuredImage.mdLgXl.childImageSharp.fixed,
          //     media: `(min-width: 768px)`,
          //   },
          // ]
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
              {/* {featuredImage && (
                <Img
                  fixed={imageSourcesSixPosts}
                  alt={title}
                  className="title-card-image rounded"
                />
              )} */}
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
      <FeaturedPost />
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
