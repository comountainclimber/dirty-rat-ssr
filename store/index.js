import axios from 'axios'
import {
  getShippingRates,
  putCheckoutData,
  completeCheckout
} from '../utils/api'

export const INITIAL_STATE = {
  loading: false,
  tax: '',
  subtotal: '',
  total: '',
  checkoutData: {
    cart_contents: {},
    shipping_rates: []
  },
  selectedShippingRate: {}
}

export const state = () => INITIAL_STATE

export const mutations = {
  setLoading(state, boolean) {
    state.loading = boolean
  },
  setTax(state, tax) {
    state.tax = tax
  },
  setSubtotal(state, subtotal) {
    state.subtotal = subtotal
  },
  setTotal(state, total) {
    state.total = total
  },
  setCheckoutData(state, data) {
    state.checkoutData = data
  },
  setSelectedShippingRate(state, data) {
    state.selectedShippingRate = data
  }
}

export const actions = {
  async fetchCheckoutData({ commit }, { myshopify_domain, cart_token }) {
    try {
      commit('setLoading', true)
      const { data } = await axios.get(
        `https://preprod.rechargeapps.com:8038/r/checkout?myshopify_domain=${myshopify_domain}&cart_token=${cart_token}`
      )

      commit('setCheckoutData', data)
      commit('setSubtotal', data.cart_contents.subtotal_price)
      commit('setTotal', data.cart_contents.total_price)
      commit('setLoading', false)
    } catch (err) {
      this.error = err
    }
  },
  async updateCheckout({ commit, state }, update) {
    try {
      commit('setLoading', true)
      const updatedCheckoutData = await putCheckoutData(
        state.checkoutData.cart_id_or_token,
        { ...update, email: 'mlasky46@gmail.com' }
      )
      console.log(updatedCheckoutData)

      commit('setCheckoutData', {
        ...state.checkoutData,
        cart_contents: updatedCheckoutData
      })
      commit('setSubtotal', updatedCheckoutData.subtotal_price)
      commit('setTax', updatedCheckoutData.total_tax)
      commit('setTotal', updatedCheckoutData.total_price)
      commit('setLoading', false)
    } catch (err) {
      this.error = err
    }
  },
  async getShippingData({ commit, state }) {
    try {
      commit('setLoading', true)
      const { shipping_rates } = await getShippingRates(
        state.checkoutData.cart_id_or_token
      )

      commit('setCheckoutData', {
        ...state.checkoutData,
        shipping_rates
      })

      commit('setSelectedShippingRate', shipping_rates[0])
      commit('setSubtotal', shipping_rates[0].checkout.subtotal_price)
      commit('setTax', shipping_rates[0].checkout.total_tax)
      commit('setTotal', shipping_rates[0].checkout.total_price)

      commit('setLoading', false)
    } catch (err) {
      this.error = err
    }
  },

  async completeCheckout({ commit, state }, nonce) {
    try {
      commit('setLoading', true)

      console.log('completing checkout')

      const updatedShipping = await putCheckoutData(
        state.checkoutData.cart_id_or_token,
        {
          shipping_line: {
            handle: state.selectedShippingRate.handle
          }
        }
      )

      console.log({ updatedShipping })

      const processingData = {
        payment_processor: 'braintree',
        payment_token: nonce
      }

      const response = await completeCheckout(
        state.checkoutData.cart_id_or_token,
        processingData
      )

      console.log({ response })
      // const { shipping_rates } = await getShippingRates(
      //   state.checkoutData.cart_id_or_token
      // );

      // commit("setCheckoutData", {
      //   ...state.checkoutData,
      //   shipping_rates
      // });

      // commit("setSelectedShippingRate", shipping_rates[0]);
      // commit("setSubtotal", shipping_rates[0].checkout.subtotal_price);
      // commit("setTax", shipping_rates[0].checkout.total_tax);
      // commit("setTotal", shipping_rates[0].checkout.total_price);

      commit('setLoading', false)
    } catch (err) {
      console.log({ err })
      this.error = err
    }
  },

  setSelectedShippingRate({ commit }, rate) {
    commit('setSelectedShippingRate', rate)
    commit('setSubtotal', rate.checkout.subtotal_price)
    commit('setTax', rate.checkout.total_tax)
    commit('setTotal', rate.checkout.total_price)
  }
}
