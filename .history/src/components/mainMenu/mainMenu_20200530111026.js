import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { createLocalLink } from "../../utils"
import "./mainMenu.scss"

const MAIN_MENU_QUERY = graphql`
  fragment MenuFields on WPGraphql_MenuItem {
    id
    label
    url
  }
  query GET_MENU_ITEMS {
    wpgraphql {
      allSettings {
        generalSettingsTitle
        generalSettingsUrl
      }
      menuItems(where: { location: MENU_1 }) {
        nodes {
          ...MenuFields
        }
      }
    }
  }
`
// livegang

const renderMenuItem = item => {
  let hasChild = false
  if (item.childItems && item.childItems.nodes.length) {
    hasChild = true
  }
  // const relativePath = menuItems.nodes.url.replace(
  //   allSettings.generalSettingsUrl,
  //   ""
  // )
  return (
    <li className="mb-0 py-16 menu-item" key={item.id}>
      <Link to={createLocalLink(item.url)} className="nav-link">
        {item.label}
      </Link>
      {hasChild && renderChildMenu(item)}
    </li>
  )
}

const renderChildMenu = item => {
  return (
    <ul className="card-shadow navbar nav">
      {item.childItems.nodes.map(child => renderMenuItem(child))}
    </ul>
  )
}

const MainMenu = props => {
  return (
    <StaticQuery
      query={MAIN_MENU_QUERY}
      render={({
        wpgraphql: {
          allSettings: { generalSettingsTitle },
          menuItems: { nodes: menu },
        },
      }) => {
        return (
          <nav className="container d-flex align-items-center">
            <h1>
              <Link to="/">{generalSettingsTitle}</Link>
            </h1>
            <ul className="navbar nav m-0 d-flex justify-content-around flex-fill align-items-center px-80">
              {menu.map(item => renderMenuItem(item))}
            </ul>
            <div className="hamburger bg-primary d-md-none"></div>
          </nav>
        )
      }}
    />
  )
}

export default MainMenu
