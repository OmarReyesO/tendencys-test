import React from "react"
import styles from "./header.module.css"

export default function Header({
  title = "",
  btnTitle = "",
  onClickPrimary = () => {},
  onClickSecondary = () => {},
  secondaryBtnTitle = ""
}) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>{title}</header>
      <div className={styles.btns}>
        {btnTitle && (
          <button className={styles.btn} onClick={onClickPrimary}>
            {btnTitle}
          </button>
        )}
        {secondaryBtnTitle && (
          <button className={styles.btn} onClick={onClickSecondary}>
            {secondaryBtnTitle}
          </button>
        )}
      </div>
    </div>
  )
}
