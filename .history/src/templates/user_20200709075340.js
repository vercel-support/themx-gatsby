import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const UserTemplate = (props) => {
  const {
    data: {
      wpgraphql: { user },
    },
  } = props;
  const { name, description } = user;
  return (
    <Layout>
      <SEO title={`Auteur: ${name}`} />
      <section className='container'>
        <h1>{name}</h1>
        <p>{description}</p>
      </section>
      {/* <section className="container grid grid-3x2 pb-60">
        {posts.nodes.map(post => {
          const archiveGrid = [
            post.featuredImage.portrait &&
              (post.featuredImage.portrait.childImageSharp.fixed,
              {
                ...post.featuredImage.landscape.childImageSharp.fixed,
                media: `(min-width: 768px)`,
              }),
          ]
          return (
            <article
              key={post.postId}
              className="title-card position-relative rounded"
            >
              <Link to={post.uri} className="d-block">
                {post.featuredImage.portrait && (
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
      </section> */}
    </Layout>
  );
};

export default UserTemplate;

export const pageQuery = graphql`
  query GET_USER($id: ID!) {
    wpgraphql {
      user(id: $id) {
        id
        name
        firstName
        uri
        description
        posts {
          nodes {
            postId
            title(format: RENDERED)
            slug
            uri
            featuredImage {
              altText
              sourceUrl
              sizes
              portrait: imageFile {
                childImageSharp {
                  fixed(
                    width: 540
                    height: 300
                    cropFocus: CENTER
                  ) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                  }
                }
              }
              landscape: imageFile {
                childImageSharp {
                  fixed(
                    width: 472
                    height: 300
                    cropFocus: CENTER
                  ) {
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
`;
