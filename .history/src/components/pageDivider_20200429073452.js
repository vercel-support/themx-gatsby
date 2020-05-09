import React from "react"
import clsx from "clsx"

const variantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
}

const PageDivider = props => {
  let Component = component || variantMapping[variant] || "span"

  return (
    <Compontent
      className={clsx(
        "page-divider",
        {
          [variant]: Component !== variant,
        },
        className
      )}
    >
      {children}
    </Compontent>
  )
}

export default PageDivider
