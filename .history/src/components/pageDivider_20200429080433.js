import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"

const PageDivider = ({ children, className, component }) => {
  let Component = component || "span"

  return (
    <Compontent className={clsx("page-divider", className)}>
      {children}
    </Compontent>
  )
}

export default PageDivider

PageDivider.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  component: PropTypes.elementType,
}

PageDivider.defaultProps = {
  className: undefined,
  component: undefined,
}
