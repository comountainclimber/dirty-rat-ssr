<template>
  <b-container id="checkout-wrapper">
    <b-row>
      <b-col md="8">
        <b-row class="store-logo-row">
          <span> <img :src="data.custom_header_logo_url"/></span>
          <h4>{{ data.store_name }}</h4>
        </b-row>
        <Billing />
      </b-col>
      <b-col md="4">
        <PricingInformation
          :tax="tax"
          :shipping="shipping"
          :subtotal="subtotal"
          :total="total"
          :line_items="data.cart_contents.line_items"
        />
      </b-col>
    </b-row>
    <div id="recharge-checkout-footer">
      <img id="recharge-footer-logo" :src="footerLogo" />
    </div>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import dropdown from '../images/dropdown.svg'
import cart from '../images/cart.svg'
import footerLogo from '../images/powered-by-recharge.png'
// import ProgressBar from '../components/ProgressBar.vue'
// import TheLoadingSpinner from '../components/TheLoadingSpinner.vue'
import PricingInformation from '../components/checkout/PricingInformation.vue'
import Billing from '../components/checkout/Billing.vue'
// import Shipping from '../components/checkout/Shipping.vue'

export default {
  name: 'Checkout',
  components: {
    // ProgressBar,
    PricingInformation,
    Billing
    // TheLoadingSpinner,
    // Shipping
  },
  head() {
    return {
      script: [
        { src: 'https://js.braintreegateway.com/web/3.57.0/js/client.js' },
        {
          src: 'https://js.braintreegateway.com/web/3.57.0/js/hosted-fields.js'
        }
      ]
    }
  },
  data: () => {
    return {
      footerLogo,
      renderCheckout: true,
      cart,
      dropdown,
      isOpen: false
    }
  },
  computed: mapState({
    loading: (state) => console.log(state) || state.loading,
    tax: (state) => state.tax,
    subtotal: (state) => state.subtotal,
    total: (state) => state.total,
    data: (state) => state.checkoutData,
    shipping: (state) => state.selectedShippingRate.price
  })
  // async fetch({ store, params, route }) {
  //   console.log('fething data')
  //   // console.log({ params, route })

  //   const { myshopify_domain, cart_token } = route.query
  //   // // console.log(this.$route)
  //   // const { data } = await axios.get(
  //   //   `https://preprod.rechargeapps.com:8038/r/checkout?myshopify_domain=${myshopify_domain}&cart_token=${cart_token}`
  //   // )
  //   await store.dispatch('fetchCheckoutData', { myshopify_domain, cart_token })
  // },

  // mounted: () => {},
  // methods: {
  //   ...mapActions(['fetchCheckoutData']),
  //   returnCurrentStep() {
  //     return this.$route.meta.step
  //   }
  // }
}
</script>

<style lang="scss"></style>
