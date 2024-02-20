import React, { createContext, useEffect, useReducer, useState } from "react"
export const OrderContext = createContext()

const SELECT_ORDER = "SELECT_ORDER"

export const OrderProvider = ({ children }) => {
  const initialState = {
    selectedOrder: null
  }

  const orderReducer = (state, { type, payload }) => {
    switch (type) {
      case SELECT_ORDER:
        return {
          ...state,
          selectedOrder: payload
        }
      default:
        return state
    }
  }

  const selectOrder = (order) => {
    dispatch({ type: SELECT_ORDER, payload: order })
  }

  const [state, dispatch] = useReducer(orderReducer, initialState)

  return (
    <OrderContext.Provider value={{ state, dispatch, selectOrder }}>
      {children}
    </OrderContext.Provider>
  )
}
