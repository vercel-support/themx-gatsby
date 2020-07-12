module.exports = {
  siteMetadata: {
    title: `Travelaar`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl:
      // 'https://travelaar-gatsby.zandbox.xyz',
      `http://localhost:8000`,
    // livegang
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
    },
    {
      resolve: `gatsby-plugin-react-helmet`,
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`roboto`],
      },
    },
    {
      resolve: `gatsby-wpgraphql-inline-images`,
      options: {
        wordPressUrl: `http://localhost/travelaar.dev/`,
        uploadsUrl: `http://localhost/travelaar.dev/wp-content/uploads/`,
        // wordPressUrl: `https://travelaar.nl/`,
        // uploadsUrl: `https://travelaar.nl/wp-content/uploads/`,
        processPostTypes: [
          `Post`,
          `Page`,
          `CustomPost`,
        ],
        graphqlTypeName: `WPGraphql`,
        generateWebp: true,
        httpHeaders: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        // livegang
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphql`,
        fieldName: `wpgraphql`,
        url: `http://localhost/travelaar.dev/graphql`,
        // url: `https://travelaar.nl/graphql`,
        // livegang
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
    },
    {
      resolve: `gatsby-plugin-sharp`,
    },
  ],
};
