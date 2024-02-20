"use client"
import { useContext } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import styles from "./page.module.css"
import { useEffect, useState } from "react"
import Alert from "@/components/Alert"
import Table from "@/components/Table"
import Header from "@/components/Header"
import Modal from "@/components/Modal"
import Input from "@/components/Input"
import { GetOrderById } from "@/api/Orders"
import { OrderContext } from "@/reducer/OrderReducer"

// Custom hook
import useForm from "@/hooks/useForm"
import useAPI from "@/hooks/useAPI"

export default function Home() {
  const { state } = useContext(OrderContext)
  const params = useParams()
  const router = useRouter()

  const {
    values,
    errorMessages,
    setFormValues,
    setFormValidations,
    refreshValues,
    handleChange,
    validateForm
  } = useForm()

  const { makeAPICall } = useAPI()

  const [selectedItem, setSelectedItem] = useState({})
  const [openFormModal, setOpenFormModal] = useState(false)
  const [openInfoModal, setOpenInfoModal] = useState(false)
  const [order, setOrder] = useState(null)
  const [tableData, setTableData] = useState([])
  const [showPaidMsg, setShowPaidMsg] = useState(false)

  const onCancel = () => {
    refreshValues()
    setOpenFormModal(false)
  }

  const onAddProduct = () => {
    if (validateForm()) {
      setOrder({ ...order, items: [...order.items, values] })
      refreshValues()
      setOpenFormModal(false)
    }
  }

  useEffect(() => {
    if (!state.selectedOrder) {
      router.push("/")
    }

    setOrder(state.selectedOrder)
    setFormValues({
      sku: "",
      name: "",
      quantity: "",
      price: ""
    })

    setFormValidations({
      sku: {
        required: true
      },
      name: {
        required: true
      },
      quantity: {
        required: true
      },
      price: {
        required: true
      }
    })
  }, [])

  useEffect(() => {
    if (order?.items?.length > 0) {
      const formattedTableData = order.items.map((item) => ({
        SKU: item.sku || "N/A",
        Name: item.name,
        Quantity: item.quantity,
        Price: item.price
      }))

      setTableData(formattedTableData)
    }
  }, [order])

  return (
    <main className="">
      <Header
        title={`Order ${order?.name || ""}`}
        btnTitle="+ Add products"
        secondaryBtnTitle="Pay Order"
        onClickPrimary={() => setOpenFormModal(true)}
        onClickSecondary={() => setShowPaidMsg(true)}
      />
      {order && (
        <div className={styles["info-container"]}>
          <span>
            <p>Payment Status:</p>
            <p className={styles[order.status.financial]}>
              {order.status.financial}
            </p>
          </span>
          <span>
            <p>Order Status:</p>
            <p className={styles[order.fulfillmentStatus.ecartapi]}>
              {order.fulfillmentStatus.ecartapi}
            </p>
          </span>
          <span>
            <p>Total:</p>
            <p className={styles["total"]}>{order.totals.total}</p>
          </span>
          <span>
            <p>Date Added:</p>
            <p className={styles["date"]}>
              {new Date(order.dates.createdAt).toLocaleDateString("es-MX")}
            </p>
          </span>
          <span>
            <p>Date Updated:</p>
            <p className={styles["date"]}>
              {new Date(order.dates.updatedAt).toLocaleDateString("es-MX")}
            </p>
          </span>
        </div>
      )}
      <h3>Items in order:</h3>
      {tableData.length > 0 && <Table data={tableData} clickableRows={false} />}
      <Modal
        visible={openFormModal}
        title="Add products"
        subtitle="Add a new product to the order"
        cancelLabel="Cancel"
        confirmLabel="Add product"
        onCancel={onCancel}
        onConfirm={onAddProduct}
      >
        <div className={styles["product-form"]}>
          <div className={styles["product-form-row"]}>
            <Input
              type="text"
              label="SKU"
              placeholder="Eg. 123"
              value={values.sku}
              name="sku"
              error={errorMessages.sku}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Name"
              placeholder="Eg. Laptop"
              value={values.name}
              name="name"
              error={errorMessages.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles["product-form-row"]}>
            <Input
              type="number"
              label="Quantity"
              placeholder={0}
              value={values.quantity}
              name="quantity"
              error={errorMessages.quantity}
              onChange={handleChange}
            />
            <Input
              type="number"
              label="Price"
              placeholder="$0.00"
              value={values.price}
              name="price"
              error={errorMessages.price}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
      <Modal
        visible={openInfoModal}
        title={selectedItem?.name || ""}
        subtitle="Add a new product to the order"
        cancelLabel="Cancel"
        onCancel={() => setOpenFormModal(false)}
      >
        <p>Product info</p>
      </Modal>
      <Alert show={showPaidMsg} msg="Order succesfully paid." />
    </main>
  )
}
