import React from "react"
import buttonStyles from "./buttons.module.scss"

const Button = () => (
  <Button>
    <button className={`${buttonStyles.button}`}>{children}</button>
  </Button>
)

export default Button
