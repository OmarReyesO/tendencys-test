import React from "react"
import Button from "./Button"
import styles from "./modal.module.css"

export default function Modal({
  children,
  visible = false,
  footerBnts = true,
  title = "",
  subtitle = "",
  confirmLabel = "",
  cancelLabel = "",
  onConfirm = () => {},
  onCancel = () => {}
}) {
  return (
    <div
      className={`${styles["modal"]} ${
        visible ? styles["modal--visible"] : ""
      }`}
      tabIndex={0}
    >
      <div className={styles["modal-container"]}>
        {title && (
          <div className={styles["modal-header"]}>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        )}

        <div className={styles["modal-body"]}>{children}</div>

        {footerBnts && (
          <div className={styles["modal-footer"]}>
            <Button
              text={cancelLabel || "Cancel"}
              type="secondary"
              onClick={onCancel}
            />
            <Button
              text={confirmLabel || "Confirm"}
              type="primary"
              onClick={onConfirm}
            />
          </div>
        )}
      </div>
    </div>
  )
}
