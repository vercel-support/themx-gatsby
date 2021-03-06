/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import "../styles/layout.scss"
import "./layout.scss"
import "../styles/styles.scss"

const Layout = ({ children, pageContext, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  // const {
  //   breadcrumb: { crumbs },
  // } = pageContext

  // Example of dynamically using location prop as a crumbLabel
  // NOTE: this code will not work for every use case, and is only an example
  // const customCrumbLabel = location.pathname.toLowerCase().replace("-", " ")

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="main-content">
        <main>{children}</main>

        <footer className="container"></footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
