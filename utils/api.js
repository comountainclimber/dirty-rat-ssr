import axios from 'axios'

import './api-config'
// import { BASE_URL, BASE_V2_URL } from "./config";
// import { generateFormData } from "../utils/helpers.js";

export async function getShippingRates(rechargeCartId) {
  const response = await axios.get(
    `/checkout-api/checkouts/${rechargeCartId}/shipping_rates`
  )
  console.log({ response })
  return response.data
}

export async function putCheckoutData(rechargeCartId, data) {
  console.log(data)
  const response = await axios.put(
    `/checkout-api/checkouts/${rechargeCartId}`,
    data
  )
  console.log({ response })
  return response.data.checkout
}

export async function completeCheckout(rechargeCartId, data) {
  console.log(data)
  const response = await axios.post(
    `/checkout-api/checkouts/${rechargeCartId}/charge`,
    data
  )
  console.log({ response })
  return response.data
}
