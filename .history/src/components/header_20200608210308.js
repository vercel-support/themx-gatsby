import PropTypes from "prop-types"
import React from "react"
// import MainMenu from "./mainMenu/mainMenu"
import TemporaryDrawer from "./materialUiDrawer/drawer.js"
import "./header.scss"

const Header = ({ siteTitle }) => (
  <>
    <header className="site-header container-fluid fixed-top bg-white px-0">
      {/* <MainMenu /> */}
      <TemporaryDrawer />
    </header>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
