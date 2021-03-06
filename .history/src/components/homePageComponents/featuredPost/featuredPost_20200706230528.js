import React from 'react';
import {
  Link,
  useStaticQuery,
  graphql,
} from 'gatsby';
import Img from 'gatsby-image';
import './featuredPost.scss';
import '../../button/button.scss';
import PropTypes from 'prop-types';

export default function FeaturedPost({
  className,
}) {
  const data = useStaticQuery(graphql`
    query FeaturedPostQuery {
      wpgraphql {
        postBy(postId: 8952) {
          uri
          title
          id
          featuredImage {
            sourceUrl
            portrait: imageFile {
              childImageSharp {
                fluid(
                  maxWidth: 757
                  maxHeight: 300
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            landscape: imageFile {
              childImageSharp {
                fluid(
                  maxWidth: 2560
                  maxHeight: 750
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  `);
  // livegang .nl -> 8952, dev -> 47167

  const {
    uri,
    title,
    featuredImage,
    id,
  } = data.wpgraphql.postBy;
  const featuredImageSources = [
    featuredImage.portrait &&
      (featuredImage.portrait.childImageSharp
        .fluid,
      {
        ...featuredImage.landscape.childImageSharp
          .fluid,
        media: `(min-width: 768px)`,
      }),
  ];

  return (
    <section className={`${className} py-60`}>
      <div className='position-relative'>
        {featuredImage.portrait && (
          <Img
            fluid={featuredImageSources}
            alt={featuredImage.altText}
          />
        )}
        <div className='featured-post-overlay d-flex justify-content-center flex-column position-absolute text-white px-60'>
          <div className='container'>
            <span className='pb-12'>
              Uitgelicht
            </span>
            <h3
              className='pb-48'
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
            <Link
              to={uri}
              className='button mr-auto'
            >
              Lees artikel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

FeaturedPost.propTypes = {
  className: PropTypes.string,
};

FeaturedPost.defaultProps = {
  className: undefined,
};
