import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const CountriesTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, description, children, countryMeta } = category
  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <h1>{name}henks</h1>
      <ul>
        {children.nodes.map(node => (
          <li>
            <Link to={node.uri}>{node.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default CountriesTemplate

export const pageQuery = graphql`
  query GET_CATEGORY($id: ID!) {
    wpgraphql {
      category(id: $id) {
        description
        id
        name
        slug
        posts {
          nodes {
            postId
            title(format: RENDERED)
            slug
          }
        }
        children {
          nodes {
            name
            uri
          }
        }
        countryMeta {
          bedankt
          besteReistijd
          hallo
          hoofdstad
          noodnummer
          plek1
          plek2
          plek3
          reisadvies
          reisbudget
          taal
          vaccinaties
          valuta
          visum
          vlagUrl
          vliegtickets
        }
      }
    }
  }
`
