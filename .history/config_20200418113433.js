import { graphql } from "gatsby"

const config = {
  // wordPressURL: `{wpgraphql.allSettings.generalSettingsUrl}`,
  wordPressURL: `http://localhost/travelaar.dev/`,
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
