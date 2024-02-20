import ConstructorAPIAsync from "./AxiosConstructor"

const ORDERS = "/orders"

async function GetOrdersList() {
  const API = await ConstructorAPIAsync()
  try {
    const { data } = await API.get(`${ORDERS}`)
    return data
  } catch (err) {
    return err
  }
}

async function GetOrderById(id) {
  const API = await ConstructorAPIAsync()
  try {
    const { data } = await API.get(`${ORDERS}` + `/${id}`)
    return data
  } catch (err) {
    return err
  }
}

export { GetOrdersList, GetOrderById }
