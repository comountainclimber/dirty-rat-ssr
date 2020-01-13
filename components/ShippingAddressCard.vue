<template>
  <b-card id="shipping-address-card">
    <h5>Shipping Address</h5>

    <b-card-text>
      <div>
        {{ shipping_address.first_name }} {{ shipping_address.last_name }}
      </div>
      <div>{{ shipping_address.address1 }}</div>
      <div v-if="shipping_address.address2">
        {{ shipping_address.address2 }}
      </div>
      <div>
        {{ shipping_address.city }} {{ shipping_address.province }}
        {{ shipping_address.zip }}
      </div>
      <div>
        {{ shipping_address.country }}
      </div>
    </b-card-text>

    <div
      id="shipping-address-change-link"
      v-on:click="handeShippingAddressChange"
      class="card-link"
    >
      Change Shipping Address
    </div>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ShippingAddressCard',
  computed: {
    ...mapState({
      shipping_address: (state) =>
        state.checkoutData &&
        state.checkoutData.cart_contents &&
        state.checkoutData.cart_contents.shipping_address
    })
  },
  methods: {
    handeShippingAddressChange() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
#foo {
  color: black;
}

#shipping-address-card {
  margin-bottom: 24px;
}

#shipping-address-change-link {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
