import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"
import Typography from "../components/typography/typography"
import Breadcrumbs from "../components/Breadcrumbs"
import PostCardCat from "../components/PostCardCat/PostCardCat"

const ContinentTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, children, seo } = category
  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <div class="container">
        <h1 className="my-24">{name}</h1>
        <Breadcrumbs props={seo} />
      </div>
      <PostCardCat props={children} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query GET_CONTINENT($id: ID!) {
    wpgraphql {
      category(id: $id) {
        description
        id
        name
        slug
        seo {
          breadcrumbs {
            text
            url
          }
        }
        children(last: 100) {
          nodes {
            name
            uri
            id
            countryMeta {
              featuredImageCategory {
                sourceUrl
                id
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
            }
          }
        }
      }
    }
  }
`

export default ContinentTemplate
