import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

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
      </div>
      <section className="container grid grid-3x2 pb-60">
        {children.nodes.map(node => (
          <article
            key={node.id}
            className="title-card position-relative rounded"
          >
            <Link to={node.uri}>
              {node.countryMeta.featuredImage && (
                <Img
                  fixed={
                    node.countryMeta.featuredImage.imageFile.childImageSharp
                      .fixed
                  }
                  key={node.countryMeta.featuredImage.id}
                />
              )}
              <h2
                className="title-card-title position-absolute"
                dangerouslySetInnerHTML={{ __html: node.name }}
              />
            </Link>
          </article>
        ))}
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
        children(last: 100) {
          nodes {
            name
            uri
            id
            countryMeta {
              featuredImage {
                sourceUrl
                id
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
    }
  }
`
