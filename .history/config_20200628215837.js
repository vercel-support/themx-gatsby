import { graphql } from "gatsby"

const config = {
  wordPressUrl: `http://localhost/travelaar.dev`,
  // wordPressURL: `http://localhost/travelaar.dev/`,
  // wordPressURL: `https://tavelaar.nl/`,
  // siteUrl: `http://localhost:8000`,
}

const wordPressUrl = `http://localhost/travelaar.dev`

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
