import React from "react"
import styles from "./input.module.css"

export default function Input({
  type = "text",
  label = "",
  placeholder = "",
  value = "",
  disabled = false,
  name = "",
  validations = {},
  error = false,
  onChange = () => {}
}) {
  return (
    <div className={styles["input-container"]}>
      <div className={styles["input-label"]}>{label}</div>
      <input
        className={`${error ? styles["input--error"] : styles["input"]}`}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e, validations)}
        name={name}
      />

      {error && <div className={styles["error-label"]}>{error}</div>}
    </div>
  )
}
