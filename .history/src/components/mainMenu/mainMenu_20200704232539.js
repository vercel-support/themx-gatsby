import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { createLocalLink } from "../../utils"
import "./mainMenu.scss"
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap"
import {
  faInstagram,
  faTwitter,
  faPinterestSquare,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import "../../styles/styles.scss"

const MAIN_MENU_QUERY = graphql`
  query GET_MENU_ITEMS {
    wpgraphql {
      allSettings {
        generalSettingsTitle
        generalSettingsUrl
      }
      menuItems(where: { location: MENU_1 }) {
        nodes {
          id
          label
          url
        }
      }
    }
  }
`
// livegang .nl -> HEADER_MENU, dev -> MENU_1

const renderMenuItem = (item, generalSettingsUrl, generalSettingsTitle) => {
  let hasChild = false
  if (item.childItems && item.childItems.nodes.length) {
    hasChild = true
  }
  const relativePath = item.url.replace(generalSettingsUrl, "")
  return (
    <Nav.Link href={createLocalLink(relativePath)} key={item.id}>
      {item.label}
      {hasChild && renderChildMenu(item)}
    </Nav.Link>
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
          allSettings: { generalSettingsUrl, generalSettingsTitle },
          menuItems: { nodes: menu },
        },
      }) => {
        return (
          <Container>
            <Navbar expand="lg" className="d-flex">
              <Navbar.Brand href="/">
                <svg
                  // width="109"
                  // height="28"
                  className="header-logo"
                  viewBox="0 0 109 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.43601 7.776C-0.111993 8.82001 -0.111993 11.916 1.25601 11.232C4.67601 9.36001 8.16801 7.812 11.66 6.624C10.832 11.412 7.84401 20.268 7.84401 24.444C7.84401 26.172 9.06801 27.576 9.89601 27.576C11.336 27.576 12.992 23.256 12.2 23.256C11.516 23.256 10.868 24.552 10.868 23.616C10.868 18.576 15.296 9.39601 15.296 7.52401C15.296 6.984 14.54 6.264 13.748 5.90401C22.784 3.06001 31.532 2.376 38.228 3.384C39.236 3.52801 38.444 0.756004 36.86 0.432004C33.584 -0.251996 14.432 0.108005 1.43601 7.776Z"
                    fill="black"
                  />
                  <path
                    d="M17.69 14.148C17.69 18.396 18.05 21.456 18.05 23.724C18.05 24.984 20.354 26.172 20.354 24.696C20.354 23.904 20.354 23.148 20.426 22.428C21.794 15.912 24.782 13.104 25.214 13.104C25.61 13.104 24.782 14.976 24.278 16.416C23.954 17.316 27.266 17.64 27.878 16.2C29.102 13.716 28.49 10.332 26.294 10.332C25.214 10.332 23.414 11.88 21.254 15.3C21.326 14.436 21.398 13.644 21.398 12.816C21.398 10.98 17.69 12.312 17.69 14.148Z"
                    fill="black"
                  />
                  <path
                    d="M29.9463 13.536C29.3343 14.472 31.8543 16.308 32.7183 15.084C34.2663 12.816 35.9943 11.556 37.1463 11.556C38.3343 11.556 37.7223 14.4 36.8943 17.244C32.0343 16.956 27.8943 18.54 27.8943 20.736C27.8943 21.852 29.3343 24.12 31.7463 24.12C33.2583 24.12 34.4103 23.4 35.3463 22.392C35.3103 22.572 35.2743 22.716 35.2743 22.824C35.2743 25.092 38.1543 25.884 38.1543 24.876C38.1543 21.708 40.2783 18.72 40.2783 14.364C40.2783 11.916 38.5503 10.116 36.6783 10.116C34.5183 10.116 31.3863 11.268 29.9463 13.536ZM32.5023 22.716C31.7463 22.716 31.2783 22.32 31.2783 21.852C31.2783 21.024 33.3303 18.684 36.5343 18.432C36.0303 19.98 34.4103 22.716 32.5023 22.716Z"
                    fill="black"
                  />
                  <path
                    d="M40.9457 17.388C40.9457 25.056 47.7857 28.404 47.8577 26.424C47.9657 22.932 50.1977 16.884 52.1057 13.896C52.4657 13.284 52.6457 11.736 51.7457 12.6C50.1617 14.364 46.7057 18.936 45.8057 23.616C45.2657 22.68 44.3297 19.224 44.3297 16.2C44.3297 14.364 40.9457 15.948 40.9457 17.388Z"
                    fill="black"
                  />
                  <path
                    d="M52.8654 21.852C52.8654 24.12 55.2054 26.892 58.5534 26.892C60.8574 26.892 63.0534 25.164 63.8814 24.012C64.4574 23.256 64.6734 21.708 63.8814 22.716C62.6934 24.264 60.8574 25.452 58.7334 25.452C57.5454 25.452 56.6454 24.372 56.6454 22.356V21.384C61.2534 21.204 64.3854 18.144 64.3854 15.984C64.3854 14.148 62.0094 11.556 59.7054 11.556C56.7534 11.556 52.8654 15.804 52.8654 21.852ZM61.3254 13.572C62.1534 14.076 59.5974 19.296 56.7534 20.412C57.4374 15.552 60.5334 13.104 61.3254 13.572Z"
                    fill="black"
                  />
                  <path
                    d="M69.6273 5.328C69.6273 9.936 65.5233 18.396 65.5233 22.644C65.5233 24.156 67.4313 25.704 68.3313 25.704C69.6993 25.704 70.8153 23.256 69.9873 23.256C69.6993 23.256 69.6993 23.688 68.6913 23.688C67.1793 23.688 73.2993 8.244 73.2993 4.14C73.2993 2.34 69.6273 4.17601 69.6273 5.328Z"
                    fill="black"
                  />
                  <path
                    d="M73.1885 13.536C72.5765 14.472 75.0965 16.308 75.9605 15.084C77.5085 12.816 79.2365 11.556 80.3885 11.556C81.5765 11.556 80.9645 14.4 80.1365 17.244C75.2765 16.956 71.1365 18.54 71.1365 20.736C71.1365 21.852 72.5765 24.12 74.9885 24.12C76.5005 24.12 77.6525 23.4 78.5885 22.392C78.5525 22.572 78.5165 22.716 78.5165 22.824C78.5165 25.092 81.3965 25.884 81.3965 24.876C81.3965 21.708 83.5205 18.72 83.5205 14.364C83.5205 11.916 81.7925 10.116 79.9205 10.116C77.7605 10.116 74.6285 11.268 73.1885 13.536ZM75.7445 22.716C74.9885 22.716 74.5205 22.32 74.5205 21.852C74.5205 21.024 76.5725 18.684 79.7765 18.432C79.2725 19.98 77.6525 22.716 75.7445 22.716Z"
                    fill="black"
                  />
                  <path
                    d="M85.8799 13.536C85.2679 14.472 87.7879 16.308 88.6519 15.084C90.1999 12.816 91.9279 11.556 93.0799 11.556C94.2679 11.556 93.6559 14.4 92.8279 17.244C87.9679 16.956 83.8279 18.54 83.8279 20.736C83.8279 21.852 85.2679 24.12 87.6799 24.12C89.1919 24.12 90.3439 23.4 91.2799 22.392C91.2439 22.572 91.2079 22.716 91.2079 22.824C91.2079 25.092 94.0879 25.884 94.0879 24.876C94.0879 21.708 96.2119 18.72 96.2119 14.364C96.2119 11.916 94.4839 10.116 92.6119 10.116C90.4519 10.116 87.3199 11.268 85.8799 13.536ZM88.4359 22.716C87.6799 22.716 87.2119 22.32 87.2119 21.852C87.2119 21.024 89.2639 18.684 92.4679 18.432C91.9639 19.98 90.3439 22.716 88.4359 22.716Z"
                    fill="black"
                  />
                  <path
                    d="M97.6353 14.148C97.6353 18.396 97.9953 21.456 97.9953 23.724C97.9953 24.984 100.299 26.172 100.299 24.696C100.299 23.904 100.299 23.148 100.371 22.428C101.739 15.912 104.727 13.104 105.159 13.104C105.555 13.104 104.727 14.976 104.223 16.416C103.899 17.316 107.211 17.64 107.823 16.2C109.047 13.716 108.435 10.332 106.239 10.332C105.159 10.332 103.359 11.88 101.199 15.3C101.271 14.436 101.343 13.644 101.343 12.816C101.343 10.98 97.6353 12.312 97.6353 14.148Z"
                    fill="black"
                  />
                </svg>
              </Navbar.Brand>
              {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
              <Navbar.Toggle
                className="hamburger-button navbar-toggler ml-auto bg-transparent rounded d-lg-none border-0"
                data-toggle="collapse"
                type="button"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <div className="hamburger"></div>
              </Navbar.Toggle>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                  {menu.map(item =>
                    renderMenuItem(
                      item,
                      generalSettingsUrl,
                      generalSettingsTitle
                    )
                  )}
                </Nav>
                <Form inline className="mb-0">
                  <FormControl
                    type="text"
                    placeholder="Zoek..."
                    className="mr-sm-2"
                  />
                  <Button className="px-16 bg-transparent">
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
          </Container>
        )
      }}
    />
  )
}

export default MainMenu
