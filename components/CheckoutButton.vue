<template>
  <div id="button-wrapper">
    <button
      id="login"
      class="rc_button rc_embed_button"
      @click="handleRenderCheckout"
    >
      Checkout with Recharge <img id="recharge-logo" :src="logo" />
    </button>
  </div>
</template>

<script>
import logo from "../images/logo__icon__white.svg";

export default {
  name: "CheckoutButton",
  data: function() {
    return {
      logo,
      renderCheckout: false
    };
  },
  methods: {
    handleRenderCheckout: async function() {
      const cartData = await window.RechargeButton.xprops.returnCartData();
      window
        .RechargeCheckoutExpress({
          cartData,
          returnCartData: window.RechargeButton.xprops.returnCartData,
          onAuthorize: window.RechargeButton.xprops.onAuthorize
        })
        .renderTo(window.parent);
    }
  }
};
</script>

<style lang="scss">
#recharge-logo {
  width: 24px;
}

.overlay {
  height: 500px;
  width: 500px;
  background-color: purple;
}
.rc_embed_button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 225px;

  img {
    margin-left: 6px;
  }
}
</style>
