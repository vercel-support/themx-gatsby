import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const ContinentsTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, children } = category
  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <section className="container">
        <h1 className="my-24">{name}</h1>
        <ul>
          {children.nodes.map(node => (
            <li>
              <Link to={node.uri}>{node.name}</Link>
              {node.countryMeta.featuredImage ? (
                <Img
                  fixed={
                    node.countryMeta.featuredImage.imageFile.childImageSharp
                      .fixed
                  }
                  key={node.countryMeta.featuredImage.id}
                />
              ) : (
                <img src="https://cdn4.iconfinder.com/data/icons/maps-of-the-world/100/.svg-12-512.png" />
              )}
              <ul>
                {node.children.nodes.map(childNode => (
                  <li>
                    <Link to={childNode.uri}>{childNode.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default ContinentsTemplate

export const pageQuery = graphql`
  query GET_CONTINENTS($id: ID!) {
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
            countryMeta {
              featuredImage {
                sourceUrl
                id
                imageFile {
                  childImageSharp {
                    fixed(width: 300, height: 300) {
                      ...GatsbyImageSharpFixed_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
            children(last: 100) {
              nodes {
                name
                uri
              }
            }
          }
        }
      }
    }
  }
`
