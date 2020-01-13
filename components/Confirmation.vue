<template>
  <div class="rc_layout__container" style="min-width: 380px;">
    <RCForm
      :submit-disabled="submitDisabled"
      :validation-error="submitDisabled"
      :submit-text="`Confirm payment for ${returnTotal()}`"
      @form-submitted="submit"
    >
      <div class="confirmation-form">
        <div class="confirmation-form-column">
          <h4>Payment info</h4>
          <div class="rc_form__row">
            <div class="rc_form__group rc_layout__xs__12">
              <label class="rc_form__label" for="cardNumber">Card Number</label>
              <small>*****{{ billingForm.cardNumber }}</small>
            </div>
          </div>

          <div class="rc_form__row">
            <div class="rc_form__group rc_layout__xs__12">
              <label class="rc_form__label" for="cardNumber">First Name</label>
              <small>{{ billingForm.firstName }}</small>
            </div>
          </div>
          <div class="rc_form__row">
            <div class="rc_form__group rc_layout__xs__12">
              <label class="rc_form__label" for="cardNumber">Last Name</label>
              <small>{{ billingForm.lastName }}</small>
            </div>
          </div>
        </div>
        <div class="confirmation-form-column">
          <h4>Shipping info</h4>
          <div class="rc_form__row">
            <div class="rc_form__group rc_layout__xs__12">
              <small>{{ shippingForm.first_name }}</small>
              <small>{{ shippingForm.last_name }}</small>
              <br />
              <small>{{ shippingForm.address1 }}</small>
              <br />
              <small>{{ shippingForm.city }}</small>
              <small>{{ shippingForm.province }}</small>
              <br />
              <small>{{ shippingForm.zip }}</small>
            </div>
          </div>
        </div>
      </div>
    </RCForm>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RCForm from "../RCForm.vue";

const stripDollarSignAndReturnNumber = amount =>
  Number(amount.replace("$", ""));

export default {
  name: "Confirmation",
  components: { RCForm },
  data() {
    return {
      phoneRE: /1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?/,
      countryOptions: ["United States"]
    };
  },
  computed: {
    ...mapState({
      billingForm: state => state.Billing.form,
      shippingForm: state => state.ShippingAddress.form,
      tax: state => state.tax,
      subtotal: state => state.subtotal
    })
  },
  methods: {
    ...mapActions(["submitPayment"]),
    returnTotal: function() {
      return `$${stripDollarSignAndReturnNumber(this.tax) +
        stripDollarSignAndReturnNumber(this.subtotal)}`;
    },
    submit: function() {
      this.submitPayment();
    }
  }
};
</script>

<style lang="scss">
.confirmation-form {
  display: flex;
  justify-content: space-between;
}
.confirmation-form-column {
  h4 {
    margin-bottom: 6px;
  }
}
</style>
