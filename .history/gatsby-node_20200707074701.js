/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const createPages = require(`./gatsby/createPages`);
const createPosts = require(`./gatsby/createPosts`);
const createCategories = require(`./gatsby/createCategories`);
const createTags = require(`./gatsby/createTags`);
const createUsers = require(`./gatsby/createUsers`);

exports.createPages = async ({
  actions,
  graphql,
}) => {
  const pluginOptions = {
    wordPressUrl: `http://localhost/travelaar.dev/`,
    uploadsUrl: `http://localhost/travelaar.dev/wp-content/uploads/`,
  };
  await createCategories(
    { actions, graphql },
    pluginOptions
  );
  await createPages(
    { actions, graphql },
    pluginOptions
  );
  await createPosts(
    { actions, graphql },
    pluginOptions
  );
  await createTags(
    { actions, graphql },
    pluginOptions
  );
  await createUsers(
    { actions, graphql },
    pluginOptions
  );
};

// Config to get gatsby-image working
const {
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`);

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: {
        type: 'File',
        async resolve(source) {
          let sourceUrl = source.sourceUrl;

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl;
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
  });
};

exports.onCreateWebpackConfig = ({
  stage,
  actions,
}) => {
  if (stage.startsWith('develop')) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
    });
  }
};
