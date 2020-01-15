<template>
  <b-col id="thanks-container">
    <b-row>
      <img :src="confirmCheck" />
    </b-row>
    <b-row>
      <span>Thank you for your order! This is a test for JASON</span>
    </b-row>
    <b-row>
      <p>
        A confirmation email has been sent to
        {{ checkoutData.cart_contents.email }}
      </p>
    </b-row>
  </b-col>
</template>

<script>
import { mapState } from 'vuex'

import confirmCheck from '../images/confirm_check.svg'

export default {
  name: 'Thanks',
  data() {
    return {
      confirmCheck
    }
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: mapState({
    loading: (state) => state.UI && state.UI.loaders.length,
    checkoutData: (state) => state.checkoutData
  })
}
</script>

<style lang="scss">
#thanks-container {
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 48px;

  img {
    margin-bottom: 12px;
  }

  .row {
    justify-content: center;
  }

  span {
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
