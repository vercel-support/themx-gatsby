import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import '../PostCard/PostCard.scss';

const PostCardCat = ({ props }) => {
  return (
    <section className='container grid grid-3x2 pb-60'>
      {props.nodes.map((node) => {
        const {
          name,
          uri,
          countryMeta,
          id,
        } = node;
        const imageSourcesSixPosts = [
          countryMeta.featuredImageCategory &&
            (countryMeta.featuredImageCategory
              .imageFile.childImageSharp.fixed,
            {
              ...countryMeta.featuredImageCategory
                .landscape.childImageSharp.fixed,
              media: `(min-width: 768px)`,
            }),
        ];
        return (
          <article
            className='title-card position-relative rounded'
            key={`${id}TitleCard`}
          >
            <Link to={uri} className='d-block'>
              <h2
                className='title-card-title position-absolute'
                dangerouslySetInnerHTML={{
                  __html: name,
                }}
              />
              {countryMeta.featuredImageCategory && (
                <Img
                  fixed={imageSourcesSixPosts}
                  alt={name}
                  className='title-card-image rounded'
                />
              )}
            </Link>
          </article>
        );
      })}
    </section>
  );
};

export default PostCardCat;