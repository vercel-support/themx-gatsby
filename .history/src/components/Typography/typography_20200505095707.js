import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"

import "./style.scss"

const variantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  "body-s": "p",
  "body-m": "p",
  "body-l": "p",
  "subtitle-1": "p",
  "subtitle-2": "p",
}

const Typography = ({
  align,
  variant,
  component,
  color,
  weight,
  disableMargin,
  fontFamily,
  className,
  children,
}) => {
  let Component = component || variantMapping[variant] || "span"

  return (
    <Component
      className={clsx(
        "typography",
        {
          [variant]: Component !== variant,
          [`font-family-${fontFamily}`]: fontFamily,
          [`text-${color}`]: color,
          [`weight-${weight}`]: weight,
          [`text-${align}`]: align,
          "my-0": disableMargin,
        },
        className
      )}
    >
      {children}
    </Component>
  )
}

export default Typography

Typography.propTypes = {
  align: PropTypes.oneOf(["left", "center", "right", undefined]),
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "danger",
    "warning",
    "success",
    "info",
    "white",
    "text-primary",
    "text-secondary",
    undefined,
  ]),
  component: PropTypes.elementType,
  disableMargin: PropTypes.bool,
  fontFamily: PropTypes.oneOf(["base", "headings", undefined]),
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "display-1",
    "display-2",
    "display-3",
    "display-4",
    "body-s",
    "body-m",
    "body-l",
    "subtitle-1",
    "subtitle-2",
    "button",
    "sr-only",
    "inherit",
  ]),
  weight: PropTypes.oneOf([
    "extra-light",
    "light",
    "thin",
    "normal",
    "medium",
    "semi-bold",
    "bold",
    "extra-bold",
    "black",
    undefined,
  ]),
}

Typography.defaultProps = {
  align: undefined,
  className: undefined,
  color: undefined,
  component: undefined,
  disableMargin: false,
  fontFamily: undefined,
  variant: "body-m",
  weight: undefined,
}
