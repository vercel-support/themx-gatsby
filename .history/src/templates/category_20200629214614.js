import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"
import Typography from "../components/typography/typography"
import Breadcrumbs from "../components/Breadcrumbs"

const CategoryTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, description, children, countryMeta, ancestors, seo } = category
  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <section className="container">
        <Breadcrumbs props={seo} />

        <h1>{name}</h1>
      </section>
      <section className="container">
        <ul>
          {children.nodes.map(node => (
            <li>
              <Link to={node.uri}>{node.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query GET_CATEGORY($id: ID!) {
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
        ancestors {
          slug
        }
        posts {
          nodes {
            postId
            title(format: RENDERED)
            slug
          }
        }
        children(last: 100) {
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
