import { graphql } from "gatsby"

const config = {
  wordPressURL: importUrl,
  // wordPressURL: `http://localhost/travelaar.dev/`,
  // wordPressURL: `https://tavelaar.nl/`,
  // siteUrl: `http://localhost:8000`,
}

const importUrl = wpgraphql.allSettings.generalSettingsUrl

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
