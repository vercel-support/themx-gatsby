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
      <section className='container pb-48'>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <Typography
              variant='h1'
              className='pb-12'
            >
              {name}
            </Typography>
            <Typography className='flex-50'>
              {description}
            </Typography>
          </div>
          <div className='col-12 col-md-6 text-right'>
            {customAuthorData.customavatar
              .imageFile && (
              <Img
                fixed={
                  customAuthorData.customavatar
                    .imageFile.childImageSharp
                    .fixed
                }
                className='ml-auto'
              />
            )}
          </div>
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
