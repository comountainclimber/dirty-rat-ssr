import axios from 'axios'

import './api-config'

export async function getShippingRates(rechargeCartId) {
  const response = await axios.get(
    `/checkout-api/checkouts/${rechargeCartId}/shipping_rates`
  )
  return response.data
}

export async function putCheckoutData(rechargeCartId, data) {
  const response = await axios.put(
    `/checkout-api/checkouts/${rechargeCartId}`,
    data
  )
  return response.data.checkout
}

export async function completeCheckout(rechargeCartId, data) {
  const response = await axios.post(
    `/checkout-api/checkouts/${rechargeCartId}/charge`,
    data
  )
  return response.data
}
