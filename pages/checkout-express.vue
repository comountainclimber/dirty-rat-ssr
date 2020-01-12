<template>
  <b-container id="checkout-wrapper">
    <!-- <div v-if="!loading || data.cart_contents.total_price" id="logo-container">
      <span> <img :src="data.custom_header_logo_url"/></span>
      <h3>{{ data.store_name }}</h3>
      <span style="text-align: center; max-width: 300px;">
        <PricingInformation
          :tax="tax"
          :shipping="shipping"
          :subtotal="subtotal"
          :total="total"
          :line_items="data.cart_contents.line_items"
        />
      </span>
    </div> -->

    <!-- <div
      v-if="!loading || data.cart_contents.total_price"
      id="progress-bar-wrapper"
    >
      <ProgressBar
        :logo-source="data.custom_header_logo_url"
        :step="returnCurrentStep()"
      />
    </div> -->

    <!-- <TheLoadingSpinner v-if="loading" is-loading /> -->
    <!-- <router-view v-if="!loading"></router-view> -->

    <b-row>
      <b-col md="8">
        <b-row class="store-logo-row">
          <span> <img :src="data.custom_header_logo_url"/></span>
          <h4>{{ data.store_name }}</h4>
        </b-row>
        <Shipping />
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
import { mapState, mapActions } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import dropdown from '../images/dropdown.svg'
import cart from '../images/cart.svg'
import footerLogo from '../images/powered-by-recharge.png'
// import ProgressBar from '../components/ProgressBar.vue'
// import TheLoadingSpinner from '../components/TheLoadingSpinner.vue'
import PricingInformation from '../components/checkout/PricingInformation.vue'
// import Billing from '../components/checkout/Billing.vue'
import Shipping from '../components/checkout/Shipping.vue'

export default {
  name: 'Checkout',
  components: {
    // ProgressBar,
    PricingInformation,
    // TheLoadingSpinner,
    Shipping
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
    // console.log({ params, route })

    const { myshopify_domain, cart_token } = route.query
    // // console.log(this.$route)
    // const { data } = await axios.get(
    //   `https://preprod.rechargeapps.com:8038/r/checkout?myshopify_domain=${myshopify_domain}&cart_token=${cart_token}`
    // )

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

// async fetch({ store, params, route }) {
//   console.log({ params, route })

//   const { myshopify_domain, cart_token } = route.query
//   // console.log(this.$route)
//   const { data } = await axios.get(
//     `https://preprod.rechargeapps.com:8038/r/checkout?myshopify_domain=${myshopify_domain}&cart_token=${cart_token}`
//   )
//   store.commit('add', data)
// },
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
