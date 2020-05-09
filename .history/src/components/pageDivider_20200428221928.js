import React from "react"

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

  return <Compontent>{children}</Compontent>
}

export default PageDivider
