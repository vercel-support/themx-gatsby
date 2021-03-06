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
      <section className="container">
        <h1 className="my-24">{name}</h1>
        <ul>
          {children.nodes.map(node => (
            <li key={node.id}>
              <Link to={node.uri}>{node.name}</Link>
              {console.log(node)}
              {/* {node.counrtyMeta.featuredImage.imageFile && (
                <Img
                  fixed={
                    node.countryMeta.featuredImage.imageFile.childImageSharp
                      .fixed
                  }
                  key={node.countryMeta.featuredImage.id}
                />
              )} */}
              {/* {node.countryMeta.featuredImage.imageFile ? (
								<Img
									fixed={
										node.countryMeta.featuredImage.imageFile.childImageSharp
											.fixed
									}
									key={node.countryMeta.featuredImage.id}
								/>
							) : (
									<img src="https://travelaar.nl/wp-content/uploads/2020/05/Yucatán-3.jpg" />
								)} */}
            </li>
          ))}
        </ul>
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
            children(last: 100) {
              nodes {
                name
                uri
                id
              }
            }
          }
        }
      }
    }
  }
`
