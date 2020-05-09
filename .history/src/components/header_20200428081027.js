import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import MainMenu from "./mainMenu"

const Header = ({ siteTitle }) => (
  <header className="container">
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
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
