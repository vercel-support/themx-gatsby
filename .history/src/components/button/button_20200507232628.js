import React from "react"
import buttonStyles from "button.scss"

const Button = children => (
  <Button>
    <button className={`${buttonStyles.button}`}>{children}</button>
  </Button>
)

export default Button
