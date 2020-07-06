module.exports = {
  siteMetadata: {
    title: `Travelaar`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `http://localhost:8000`,
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
        uploadsUrl: `http://localhost/travelaar.dev/wp-content/uploads/`,
        // wordPressUrl: `https://travelaar.nl/`,
        // uploadsUrl: `https://travelaar.nl/wp-content/uploads/`,
        processPostTypes: [`Post`, `Page`, `CustomPost`],
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
    {
      resolve: 'gatsby-plugin-eslint',
    },
    {
      resolve: 'gatsby-plugin-prettier-eslint',
      options: {
        cwd: process.cwd(), // path to a directory that should be considered as the current working directory
        watch: true, // format/lint on save
        initialScan: true, // if true, will format/lint the whole project on Gatsby startup
        onChangeFullScanLint: false, // if true, on file save always perform full scan lint
        onChangeFullScanFormat: false, // if true, on file save always perform full scan format
        prettierLast: false, // if true, will run Prettier after ESLint
        ignorePatterns: [
          '**/node_modules/**/*',
          '**/.git/**/*',
          '**/dist/**/*',
          '.cache/**/*',
          'public/**/*',
        ], // string or array of paths/files/globs to ignore
        prettier: {
          patterns: [], // string or array of paths/files/globs to include related only to Prettier
          ignorePatterns: [], // string or array of paths/files/globs to exclude related only to Prettier
          customOptions: {}, // see: https://prettier.io/docs/en/options.html
        },
        eslint: {
          patterns: [], // string or array of paths/files/globs to include related only to ESLint
          ignorePatterns: [], // string or array of paths/files/globs to exclude related only to ESLint
          formatter: 'stylish', // set custom or third party formatter
          maxWarnings: undefined, // number of max warnings allowed, when exceed it will fail Gatsby build
          emitWarning: true, // if true, will emit lint warnings
          failOnError: false, // if true, any lint error will fail the build, you may set true only in your prod config
          failOnWarning: false, // same as failOnError but for warnings
          plugins: [], // an array of plugins to load for ESLint
          customOptions: {}, // see: https://eslint.org/docs/developer-guide/nodejs-api#cliengine
        },
      },
    },
  ],
};
