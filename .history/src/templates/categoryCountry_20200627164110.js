import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Typography from "../components/typography/typography"
import Img from "gatsby-image"
import "../components/homePageComponents/titleCards/titleCards.scss"

const CountryTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, description, countryMeta, posts } = category

  return (
    <Layout>
      <SEO title={`Categorie: ${name}`} />
      <section className="container">
        <h1>{name}</h1>
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
            <article key={post.postId}>
              <Link
                to={post.uri}
                className="title-card position-relative rounded"
              >
                {post.featuredImage.xsSm && (
                  <Img fixed={archiveGrid} alt={post.featuredImage.altText} />
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
