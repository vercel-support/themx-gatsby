import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Typography from "../components/typography/typography"

const CountryTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, description, countryMeta, posts, children } = category
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

      {console.log(children)}

      <section className="container">
        {posts.nodes.map(post => (
          <article key={post.postId}>
            <Link to={post.uri}>
              <Typography variant="h2">{post.title}</Typography>
            </Link>
          </article>
        ))}
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
        posts {
          nodes {
            postId
            title(format: RENDERED)
            slug
            uri
            featuredImage {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 540, maxHeight: 450) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
