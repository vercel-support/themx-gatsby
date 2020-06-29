import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import config from "../../config.js"
import Typography from "../components/typography/typography"

const Breadcrumbs = props => {
  // const { seo } = props
  return (
    <nav>
      <div class="d-flex align-items-center">
        {seo.breadcrumbs.map((breadcrumb, index) => {
          return (
            <div className="d-inline" key={index}>
              {breadcrumb.text === "Home" ? (
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} />
                  <span className="sr-only">Home</span>
                </Link>
              ) : (
                <span className="d-flex align-items-center">
                  {index ? (
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="px-2 mx-8 text-gray-400"
                    />
                  ) : (
                    ""
                  )}
                  <Link to={breadcrumb.url.replace(config.wordPressUrl, "")}>
                    <Typography
                      component="span"
                      weight="light"
                      variant="body-s"
                    >
                      {breadcrumb.text}
                    </Typography>
                  </Link>
                </span>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default Breadcrumbs
