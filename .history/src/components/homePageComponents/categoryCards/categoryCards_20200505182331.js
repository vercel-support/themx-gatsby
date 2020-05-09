import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { createLocalLink } from "../../utils"
import "./categoryCards.scss"

const CATEGORY_CARDS_QUERY = graphql`
  query GET_MENU_ITEMS {
    wpgraphql {
      posts(first: 3, where: { categoryName: "Budget" }) {
        nodes {
          date
          title
          excerpt(format: RENDERED)
          featuredImage {
            altText
            sourceUrl
            sizes
          }
        }
      }
    }
  }
`

const renderMenuItem = item => {
  let hasChild = false
  if (item.childItems && item.childItems.nodes.length) {
    hasChild = true
  }
  return (
    <li className="mb-0 py-16">
      <Link to={createLocalLink(item.url)}>{item.label}</Link>
      {hasChild && renderChildMenu(item)}
    </li>
  )
}

const renderChildMenu = item => {
  return <ul>{item.childItems.nodes.map(child => renderMenuItem(child))}</ul>
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
          </nav>
        )
      }}
    />
  )
}

export default MainMenu
