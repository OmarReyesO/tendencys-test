"use client"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Table from "@/components/Table"
import Header from "@/components/Header"
import { GetOrdersList } from "@/api/Orders"
import { OrderContext } from "@/reducer/OrderReducer"

// Custom hook
import useAPI from "@/hooks/useAPI"

export default function Home() {
  const { state, selectOrder } = useContext(OrderContext)
  const [orders, setOrders] = useState([])
  const [tableData, setTableData] = useState([])
  const { makeAPICall } = useAPI()
  const router = useRouter()

  const onRowClick = (selectedOrder) => {
    selectOrder(
      orders.find((order) => order.number === selectedOrder["Order #"])
    )
    router.push(`/orders/${selectedOrder["Order #"]}`)
  }

  const getOrdersData = async () => {
    const response = await makeAPICall(GetOrdersList)
    if (response) {
      setOrders(response.orders)
    }
  }

  useEffect(() => {
    getOrdersData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const formattedTableData = orders.map((order) => ({
      "Order #": order.number,
      "Payment Status": order.status.financial,
      "Order Status": order.fulfillmentStatus.ecartapi,
      Total: "$" + order.totals.total,
      "Date Added": new Date(order.dates.createdAt).toLocaleDateString("es-MX"),
      "Date Updated": new Date(order.dates.updatedAt).toLocaleDateString(
        "es-MX"
      )
    }))

    setTableData(formattedTableData)
  }, [orders])

  return (
    <main className="">
      <Header title="Orders" />
      {tableData.length > 0 && (
        <Table data={tableData} onRowClick={onRowClick} />
      )}
    </main>
  )
}
