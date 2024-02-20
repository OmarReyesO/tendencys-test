"use client"
import React from "react"
import styles from "./table.module.css"

function Table({ data, onRowClick = () => {}, clickableRows = true }) {
  const columns = Object?.keys(data[0])

  return (
    <table
      className={`${styles.table} ${
        clickableRows ? styles["table--clickable"] : ""
      }`}
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} onClick={() => onRowClick(row)}>
            {columns.map((column) => (
              <td key={column}>
                <span className={styles[row[column]]}>{row[column]}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
