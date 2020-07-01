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
      <section className="container grid grid-3x2 pb-60">
        {children.nodes.map(node => {
          const archiveGrid = [
            node.countryMeta.featuredImageCategory &&
              (node.countryMeta.featuredImageCategory.xsSm.childImageSharp
                .fixed,
              {
                ...node.countryMeta.featuredImageCategory.mdLgXl.childImageSharp
                  .fixed,
                media: `(min-width: 768px)`,
              }),
          ]

          return (
            <article
              key={node.id}
              className="title-card position-relative rounded"
            >
              <Link to={node.uri}>
                {node.countryMeta.featuredImageCategory && (
                  <Img
                    fixed={archiveGrid}
                    key={node.countryMeta.featuredImageCategory.id}
                    className="title-card-image rounded"
                  />
                )}
                <h2
                  className="title-card-title position-absolute"
                  dangerouslySetInnerHTML={{ __html: node.name }}
                />
              </Link>
            </article>
          )
        })}
      </section>
    </Layout>
  )
}

export default ContinentTemplate

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
            }
          }
        }
      }
    }
  }
`
