import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostCard from '../components/PostCard/PostCard';
import Typography from '../components/typography/typography';
import Img from 'gatsby-image';

const UserTemplate = (props) => {
  const {
    data: {
      wpgraphql: { user },
    },
  } = props;
  const {
    name,
    description,
    posts,
    customAuthorData,
  } = user;
  return (
    <Layout>
      <SEO title={`Auteur: ${name}`} />
      <section className='container'>
        <Typography variant='h1'>
          {name}
        </Typography>
        <div className='d-flex'>
          <Typography className='flex-50'>
            {description}
          </Typography>
          {customAuthorData.customavatar
            .imageFile && (
            <Img
              fixed={
                customAuthorData.customavatar
                  .imageFile.childImageSharp.fixed
              }
            />
          )}
        </div>
      </section>
      <PostCard props={posts.edges} />
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
        customAuthorData {
          customavatar {
            sourceUrl
            altText
            imageFile {
              childImageSharp {
                fixed(
                  width: 450
                  height: 450
                  cropFocus: CENTER
                ) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
        }
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
