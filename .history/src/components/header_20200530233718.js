import PropTypes from "prop-types"
import React from "react"
import MainMenu from "./mainMenu/mainMenu"
import "header.scss"

const Header = ({ siteTitle }) => (
  <>
    <header className="container-fluid fixed-top bg-white px-0">
      <MainMenu />
    </header>
    <div className="header-pushdown"></div>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
