module.exports = {
  siteMetadata: {
    title: `Travelaar`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: "http://localhost:8000",
    // siteUrl: "https://travelaar-gatsby.zandbox.xyz",
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
        uploadsUrl: `http://localhost/wp-content/uploads/`,
        processPostTypes: [`Post`, `Page`],
        graphqlTypeName: `WPGraphql`,
        generateWebp: true,
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphql`,
        fieldName: `wpgraphql`,
        url: `http://localhost/travelaar.dev/graphql`,
        // url: `https://travelaar.zandbox.xyz/graphql`,
        // url: `https://travelaar.com/graphql`,
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
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        // useAutoGen: required 'true' to use autogen
        useAutoGen: true,
        // exlude: optional, include this array to overwrite paths you don't want to
        // generate breadcrumbs for.
        // exclude: [`/404/`],
        // trailingSlashes: optional, will add trailing slashes to the end
        // of crumb pathnames. default is false
        // trailingSlashes: true,
      },
    },
  ],
}
