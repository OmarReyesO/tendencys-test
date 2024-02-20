import { useContext } from "react"
//import { AlertContext } from "@/lib/context/AlertContext"

export default function useAPI() {
  //const { showAlert } = useContext(AlertContext)
  const makeAPICall = async (APIMethod) => {
    const APIResponse = await APIMethod()
    if (APIResponse.response) {
      const { data } = APIResponse.response
      if (data.context) {
        const { context } = data
        //showAlert({ msg: context.detail, type: 'danger' })
      } else {
        //showAlert({ msg: data.detail, type: 'danger' })
      }
      return null
    }

    return APIResponse || {}
  }

  return { makeAPICall }
}
