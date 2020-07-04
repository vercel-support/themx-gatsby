import { graphql } from "gatsby"

const config = {
  wordPressUrl: `http://localhost/travelaar.dev`,
  UploadsUrl: `http://localhost/travelaar.dev/wp-content/uploads/`,
  // wordPressURL: `http://localhost/travelaar.dev/`,
  // wordPressURL: `https://tavelaar.nl/`,
  // siteUrl: `http://localhost:8000`,
}

// livegang
export default config

export const configQuery = graphql`
  query GET_CONFIG {
    wpgraphql {
      allSettings {
        generalSettingsUrl
      }
    }
  }
`
