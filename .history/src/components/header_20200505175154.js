import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import MainMenu from "./mainMenu"

const Header = ({ siteTitle }) => (
  <header className="container-fluid fixed-top">
    <MainMenu />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
