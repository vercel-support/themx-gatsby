import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import "./pageDivider.scss"

const PageDivider = ({ children, className, component }) => {
  let Component = component || "span"

  return (
    <Component className={clsx("container page-divider", className)}>
      {children}
    </Component>
  )
}

export default PageDivider

PageDivider.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  component: PropTypes.elementType,
}

PageDivider.defaultProps = {
  className: "pb-48 pt-60",
  component: undefined,
}
