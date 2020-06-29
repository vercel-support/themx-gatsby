import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"

const ContinentTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, children } = category
  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <div class="container">
        <h1 className="my-24">{name}</h1>
        <div class="d-flex align-items-center">
          {seo.breadcrumbs.map((breadcrumb, index) => {
            return (
              <div className="d-inline" key={index}>
                {breadcrumb.text === "Home" ? (
                  <Link to="/">
                    <FontAwesomeIcon icon={faHome} />
                    <span className="sr-only">Home</span>
                  </Link>
                ) : (
                  <span className="d-flex align-items-center">
                    {index ? (
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="px-2 mx-8 text-gray-400"
                      />
                    ) : (
                      ""
                    )}
                    <Link to={breadcrumb.url.replace(config.wordPressUrl, "")}>
                      <Typography
                        component="span"
                        weight="light"
                        variant="body-s"
                      >
                        {breadcrumb.text}
                      </Typography>
                    </Link>
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <section className="container grid grid-3x2 pb-60">
        {children.nodes.map(node => {
          const archiveGrid = [
            node.countryMeta.featuredImage &&
              (node.countryMeta.featuredImage.xsSm.childImageSharp.fixed,
              {
                ...node.countryMeta.featuredImage.mdLgXl.childImageSharp.fixed,
                media: `(min-width: 768px)`,
              }),
          ]

          return (
            <article
              key={node.id}
              className="title-card position-relative rounded"
            >
              <Link to={node.uri}>
                {node.countryMeta.featuredImage && (
                  <Img
                    fixed={archiveGrid}
                    key={node.countryMeta.featuredImage.id}
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
              featuredImage {
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
