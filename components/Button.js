import React from "react"
import styles from "./button.module.css"

export default function Button({
  type = "primary",
  text = "",
  onClick = () => {}
}) {
  return (
    <button
      className={`${styles.btn} ${styles[`btn--${type}`]}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
