<template>
  <b-container id="checkout-wrapper">
    <b-row>
      <b-col md="7">
        <b-row class="store-logo-row">
          <span> <img :src="data.custom_header_logo_url"/></span>
          <h4>{{ data.store_name }}</h4>
        </b-row>
        <Billing />
      </b-col>
      <b-col md="5">
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

import dropdown from '../../images/dropdown.svg'
import cart from '../../images/cart.svg'
import footerLogo from '../../images/powered-by-recharge.png'
import PricingInformation from '../../components/PricingInformation.vue'
import Billing from '../../components/Billing.vue'

export default {
  name: 'Checkout',
  components: {
    PricingInformation,
    Billing
  },
  head() {
    // NOTE: we should only inject these scripts if the store uses braintree
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
}
</script>

<style lang="scss"></style>
