import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"

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
        <nav>
          <div class="d-flex align-items-center">
            {seo.breadcrumbs.map((breadcrumb, index) => {
              return (
                <div className="d-inline" key={index}>
                  {breadcrumb.text == "Home" ? (
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
                      <Link
                        to={breadcrumb.url.replace(config.wordPressUrl, "")}
                      >
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
        </nav>
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
