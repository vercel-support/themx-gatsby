import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Typography from "../components/typography/typography"
import Img from "gatsby-image"
import "../components/homePageComponents/titleCards/titleCards.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"

const CountryTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, description, countryMeta, posts, seo } = category

  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <section className="container">
        <h1>{name}</h1>
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

        <div dangerouslySetInnerHTML={{ __html: `${description}` }} />
        <p>{countryMeta.bedankt}</p>
        <p>{countryMeta.besteReistijd}</p>
        <p>{countryMeta.hallo}</p>
        <p>{countryMeta.hoofdstad}</p>
        <p>{countryMeta.noodnummer}</p>
        <p>{countryMeta.plek1}</p>
        <p>{countryMeta.plek2}</p>
        <p>{countryMeta.plek3}</p>
        <p>{countryMeta.reisadvies}</p>
        <p>{countryMeta.reisbudget}</p>
        <p>{countryMeta.taal}</p>
        <p>{countryMeta.vaccinaties}</p>
        <p>{countryMeta.valuta}</p>
        <p>{countryMeta.visum}</p>
        <p>{countryMeta.vlagUrl}</p>
        <p>{countryMeta.vliegtickets}</p>
      </section>

      <section className="container grid grid-3x2 pb-60">
        {posts.nodes.map(post => {
          const archiveGrid = [
            post.featuredImage.xsSm &&
              (post.featuredImage.xsSm.childImageSharp.fixed,
              {
                ...post.featuredImage.mdLgXl.childImageSharp.fixed,
                media: `(min-width: 768px)`,
              }),
          ]
          return (
            <article
              key={post.postId}
              className="title-card position-relative rounded"
            >
              <Link to={post.uri}>
                {post.featuredImage.xsSm && (
                  <Img
                    fixed={archiveGrid}
                    alt={post.featuredImage.altText}
                    className="title-card-image rounded"
                  />
                )}
                <h2
                  className="title-card-title position-absolute"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
              </Link>
            </article>
          )
        })}
      </section>
    </Layout>
  )
}

export default CountryTemplate

export const pageQuery = graphql`
  query GET_COUNTRY($id: ID!) {
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
        posts(first: 100) {
          nodes {
            postId
            title(format: RENDERED)
            slug
            uri
            featuredImage {
              sourceUrl
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
