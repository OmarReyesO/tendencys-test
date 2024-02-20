import axios from "axios"
import APISettings from "./_SettingsAPI.json"

const BASE_URL = `${APISettings.DOMAIN}`

async function ConstructorAPIAsync(timeoutRequest = 5000) {
  const timeout = timeoutRequest
  const headers = {
    "content-type": "application/json",
    Accept: "*/*",
    Authorization: `Bearer ${APISettings.TOKEN}`
  }

  return axios.create({
    baseURL: BASE_URL,
    headers,
    responseType: "json",
    responseEncoding: "utf8",
    timeout,
    type: "json"
  })
}

export default ConstructorAPIAsync
