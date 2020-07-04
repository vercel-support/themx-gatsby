import { graphql } from "gatsby"

const config = {
  // wordPressUrl: `http://localhost/travelaar.dev/`,
  // uploadsUrl: `http://localhost/travelaar.dev/wp-content/uploads/`,
  wordPressUrl: `https://travelaar.nl/`,
  uploadsUrl: `https://travelaar.nl/wp-content/uploads/`,
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
