import { graphql } from "gatsby"

const config = {
  wordPressURL: `{wpgraphql.allSettings.generalSettingsUrl}`,
  // wordPressURL: `http://localhost/travelaar.dev/`,
  // wordPressURL: `https://tavelaar.nl/`,
  // siteUrl: `http://localhost:8000`,
}

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
