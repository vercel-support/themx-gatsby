import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostCard from '../components/PostCard/PostCard';

const UserTemplate = (props) => {
  const {
    data: {
      wpgraphql: { user },
    },
  } = props;
  const { name, description, posts } = user;
  return (
    <Layout>
      <SEO title={`Auteur: ${name}`} />
      <section className='container'>
        <h1>{name}</h1>
        <p>{description}</p>
      </section>
      <section className='container'>
        <PostCard props={posts.edges} />
      </section>
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
        description
        posts {
          edges {
            node {
              categories(
                where: {
                  shouldOutputInFlatList: true
                  childless: true
                }
              ) {
                nodes {
                  name
                }
              }
              uri
              id
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
              title(format: RENDERED)
            }
          }
        }
      }
    }
  }
`;
