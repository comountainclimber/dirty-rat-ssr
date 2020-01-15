<template>
  <b-container id="checkout-wrapper">
    <b-row>
      <b-col md="7">
        <b-row class="store-logo-row">
          <span> <img :src="data.custom_header_logo_url"/></span>
          <h4>{{ data.store_name }}</h4>
        </b-row>
        <Shipping />
        <!-- <Billing /> -->
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
import { mapState, mapActions } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import dropdown from '../images/dropdown.svg'
import cart from '../images/cart.svg'
import footerLogo from '../images/powered-by-recharge.png'
import PricingInformation from '../components/PricingInformation.vue'
import Shipping from '../components/Shipping.vue'
// import Billing from '../components/Billing.vue'

export default {
  name: 'Checkout',
  components: {
    PricingInformation,
    Shipping
    // Billing
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
  computed: mapState({
    loading: (state) => console.log(state) || state.loading,
    tax: (state) => state.tax,
    subtotal: (state) => state.subtotal,
    total: (state) => state.total,
    data: (state) => state.checkoutData,
    shipping: (state) => state.selectedShippingRate.price
  }),
  async fetch({ store, params, route }) {
    const { myshopify_domain, cart_token } = route.query
    if (!store.state.total) {
      await store.dispatch('fetchCheckoutData', {
        myshopify_domain,
        cart_token
      })
    }
  },

  mounted: () => {},
  methods: {
    ...mapActions(['fetchCheckoutData']),
    returnCurrentStep() {
      return this.$route.meta.step
    }
  }
}
</script>

<style lang="scss">
.store-logo-row {
  align-items: center;
  margin-bottom: 24px;

  h4 {
    margin: 0;
  }

  img {
    max-width: 100px;
    margin-right: 12px;
  }
}
#checkout-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 400px;
  padding: 12px;
}
#recharge-checkout-footer {
  margin-top: auto;
  text-align: center;
  margin-bottom: 12px;
  margin-top: 48px;
}
#recharge-footer-logo {
  max-width: 200px;
}

#logo-container {
  width: 100%;
  text-align: center;
  margin: 12px 0 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    max-width: 120px;
  }
}
</style>
