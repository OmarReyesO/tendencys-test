import React from "react"
import styles from "./alert.module.css"

export default function Alert({ show = false, msg = "" }) {
  return (
    <div
      className={`${styles["alert-container"]} ${
        show ? styles["alert-container--visible"] : ""
      }`}
    >
      <p>{msg}</p>
    </div>
  )
}
