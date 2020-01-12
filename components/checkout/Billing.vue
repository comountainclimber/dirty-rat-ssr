<template>
  <div>
    <div class="container">
      <h5>Shipping Method</h5>
      <b-col md="10" sm="12" class="shipping-option-rate-radio-container">
        <b-form-group>
          <b-form-radio-group
            v-model="selectedShippingRate"
            v-on:change="handleShippingOptionChange"
          >
            <b-form-radio
              v-for="rate in checkoutData.shipping_rates"
              v-bind:key="rate.code"
              :name="rate.code"
              :id="rate.code"
              :value="rate"
              type="radio"
            >
              <div class="shipping-option-rate-contents">
                <div class="shipping-option-rate-name">
                  {{ rate.name }}
                </div>

                <div class="shipping-option-rate-price">${{ rate.price }}</div>
              </div>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-col>

      <!-- <h5>Billing Address</h5>
      <b-col md="10" sm="12" id="shipping-option-rate-radio-container">
        <b-form-group>
          <b-form-radio-group
            v-model="selectedShippingRate"
            v-on:change="handleShippingOptionChange"
          >
            <b-form-radio
              v-for="rate in checkoutData.shipping_rates"
              v-bind:key="rate.code"
              :name="rate.code"
              :id="rate.code"
              :value="rate"
              type="radio"
            >
              <div class="shipping-option-rate-contents">
                <div class="shipping-option-rate-name">
                  {{ rate.name }}
                </div>

                <div class="shipping-option-rate-price">${{ rate.price }}</div>
              </div>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-col> -->

      <h5>Payment method</h5>
      <!-- <b-col md="10" sm="12" class="shipping-option-rate-radio-container">
        <b-form-group>
          <b-form-radio-group
            v-model="selectedShippingRate"
            v-on:change="handleShippingOptionChange"
          >
            <b-form-radio
              v-for="rate in checkoutData.shipping_rates"
              v-bind:key="rate.code"
              :name="rate.code"
              :id="rate.code"
              :value="rate"
              type="radio"
            >
              <div class="shipping-option-rate-contents">
                <div class="shipping-option-rate-name">
                  {{ rate.name }}
                </div>

                <div class="shipping-option-rate-price">${{ rate.price }}</div>
              </div>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-col> -->
      <b-col md="10" sm="12" class="shipping-option-rate-radio-container">
        <b-form-group>
          <b-form-radio-group
            id="radio-slots"
            v-model="paymentMethodOptions.selected"
            :options="paymentMethodOptions.options"
            name="radio-options-slots"
            v-on:change="handlePaymentOptionChange"
          >
            <form
              id="credit-card-form"
              v-if="paymentMethodOptions.selected === 'credit'"
            >
              <div class="form-group">
                <label>Card Number:</label>
                <div id="card-number" class="form-control" />
              </div>

              <div class="form-group">
                <label>Expiration:</label>
                <div id="expiration-date" class="form-control" />
              </div>

              <div class="form-group">
                <label>CVV:</label>
                <div id="cvv" class="form-control" />
              </div>
            </form>
          </b-form-radio-group>
        </b-form-group>
      </b-col>

      <b-col md="10" sm="12">
        <div id="billing-button-container">
          <b-button variant="primary" id="billing-button"
            >Place My Order
          </b-button>
        </div>
      </b-col>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import isEmpty from 'lodash/isEmpty'

// import router from "../../router/router.js";
// import RCForm from '../RCForm.vue'

const { mapFields } = createHelpers({
  getterType: 'Billing/getForm',
  mutationType: 'Billing/updateFormField'
})

export default {
  name: 'Billing',
  // components: { RCForm },
  data() {
    return {
      selectedShippingRate: this.$store.state.selectedShippingRate,
      paymentMethodOptions: {
        selected: 'credit',
        options: [
          { text: 'Credit', value: 'credit' },
          { text: 'Paypal', value: 'paypal' }
        ]
      }
    }
  },

  computed: {
    ...mapState('Billing', ['form']),
    ...mapState(['checkoutData']),
    ...mapFields(['cardNumber', 'expiration', 'cvv', 'firstName', 'lastName']),
    submitDisabled() {
      return !isEmpty(this.errors.collect())
    }
    // ...mapState({
    //   selectedShippingRate: (state) =>
    // })
    // selectedShippingValue: (state) =>
    //   state.checkoutData.shipping_rates[0] &&
    //   state.checkoutData.shipping_rates[0].code,
    // computedSelectedShippingValue: {
    //   get() {
    //     return this.selectedShippingValue
    //   },
    //   set(value) {
    //     const option = this.checkoutData.shipping_rates.find(
    //       (rate) => rate.code === value
    //     )

    //     this.handleShippingOptionChange(option)
    //     return value
    //   }
    // }
    // selectedShippingValue: (state) => state.checkoutData.shipping_rates[0].code,
    // selectedShippingValue: {
    //   get(value) {
    //     this.selectedShippingValue2 = value
    //     return this.selectedShippingValue2
    //   },
    //   set(value) {
    //     console.log(value)

    //     const option = this.checkoutData.shipping_rates.find(
    //       (rate) => rate.code === value
    //     )

    //     return this.handleShippingOptionChange(option)
    //   }
    // }
  },
  // watch: {
  //   // whenever question changes, this function will run
  //   selectedShippingValue: (value) => {
  //     const option = this.checkoutData.shipping_rates.find(
  //       (rate) => rate.code === value
  //     )

  //     this.handleShippingOptionChange(option)
  //     return value
  //   }
  // },

  methods: {
    ...mapMutations('Billing', ['updateFormField']),
    ...mapActions([
      'submitBillingInformation',
      'setSelectedShippingRate',
      'completeCheckout'
    ]),
    submit() {
      // handled by braintree sdk
    },
    handleShippingOptionChange(option) {
      console.log({ option })
      this.setSelectedShippingRate(option)
    },
    handlePaymentOptionChange(option) {
      if (option === 'credit') this.createBraintreeHostedFields()
    },
    createBraintreeHostedFields() {
      const completeCheckout = this.completeCheckout
      const form = document.querySelector('#credit-card-form')
      const authorization =
        'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNklrRjFkR2g1SW4wLmV5SmxlSEFpT2pFMU56ZzVNREF3TURVc0ltcDBhU0k2SW1FeFpEVTFNamxoTFdVelpXUXROREZpTXkxaE1qY3pMVFUzTmpNek5HSTJOVFkxTWlJc0luTjFZaUk2SW5aMllqSjBlSFIyTm1RemEycDRNMk1pTENKcGMzTWlPaUpCZFhSb2VTSXNJbTFsY21Ob1lXNTBJanA3SW5CMVlteHBZMTlwWkNJNkluWjJZakowZUhSMk5tUXphMnA0TTJNaUxDSjJaWEpwWm5sZlkyRnlaRjlpZVY5a1pXWmhkV3gwSWpwbVlXeHpaWDBzSW5KcFoyaDBjeUk2V3lKdFlXNWhaMlZmZG1GMWJIUWlYU3dpYjNCMGFXOXVjeUk2ZTMxOS5XaEo2UFFaTlRaTEVZNGRVR0Y2Q3B2ckp6TGY3MUFBRVJCZ0ZScENhVXhwNTVRaEU3YjVlTjFybUsxMkRwNUNyOUI2TWpKYlctaTBaRXFjeGdsdmxOQSIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy92dmIydHh0djZkM2tqeDNjL2NsaWVudF9hcGkvdjEvY29uZmlndXJhdGlvbiIsImdyYXBoUUwiOnsidXJsIjoiaHR0cHM6Ly9wYXltZW50cy5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL2dyYXBocWwiLCJkYXRlIjoiMjAxOC0wNS0wOCJ9LCJjaGFsbGVuZ2VzIjpbInBvc3RhbF9jb2RlIl0sImVudmlyb25tZW50Ijoic2FuZGJveCIsImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy92dmIydHh0djZkM2tqeDNjL2NsaWVudF9hcGkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL3Z2YjJ0eHR2NmQza2p4M2MifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiUmVDaGFyZ2UiLCJjbGllbnRJZCI6IkFlTkFQQXZhQ0VBUmlYMXBmSTAxRS1zZG1IeDJfcUNGZnU2TGVRcVQ4di1YMVdQVzBlZlpKdXF4T3FTaEhOQmpNRklwX1I3dzduN3ZENkF3IiwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6ZmFsc2UsImVudmlyb25tZW50Ijoib2ZmbGluZSIsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsIm1lcmNoYW50QWNjb3VudElkIjoicmVjaGFyZ2UiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwibWVyY2hhbnRJZCI6InZ2YjJ0eHR2NmQza2p4M2MiLCJ2ZW5tbyI6Im9mZiJ9'

      // eslint-disable-next-line
      braintree.client.create(
        {
          authorization
        },
        function(err, clientInstance) {
          if (err) {
            console.error(err)
            return
          }
          createHostedFields(clientInstance)
        }
      )

      function createHostedFields(clientInstance) {
        // eslint-disable-next-line
        braintree.hostedFields.create(
          {
            client: clientInstance,
            styles: {
              input: {
                'font-size': '16px',
                // 'font-family': 'courier, monospace',
                'font-weight': 'lighter',
                color: '#ccc'
              },
              ':focus': {
                color: 'black'
              },
              '.valid': {
                color: '#8bdda8'
              }
            },
            fields: {
              number: {
                selector: '#card-number',
                placeholder: '4111 1111 1111 1111'
              },
              cvv: {
                selector: '#cvv',
                placeholder: '123'
              },
              expirationDate: {
                selector: '#expiration-date',
                placeholder: 'MM/YYYY'
              }
            }
          },
          (err, hostedFieldsInstance) => {
            form.addEventListener(
              'submit',
              (event) => {
                event.preventDefault()

                hostedFieldsInstance.tokenize((tokenizeErr, payload) => {
                  console.log({ payload })
                  if (tokenizeErr) {
                    console.error(tokenizeErr)
                    return
                  }

                  // If this was a real integration, this is where you would
                  // send the nonce to your server.
                  console.log('Got a nonce: ' + payload.nonce)

                  completeCheckout(payload.nonce)
                })
              },
              false
            )

            if (err) {
            }
          }
        )
      }
    }
  },
  mounted() {
    this.createBraintreeHostedFields()
  }
}
</script>

<style lang="scss">
#rc_shipping_address__form {
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
}

#billing-button-container {
  display: flex;
  margin-bottom: 24px;
  margin-top: 24px;
  justify-self: center;
  width: 100%;
}

#billing-button {
  width: 75%;
  margin: auto;
  display: flex;
  justify-content: center;
}

.shipping-options-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  .shipping-rate-price {
    margin-left: auto;
  }

  label {
    display: flex !important;
    margin: 12px;
    // justify-content: space-between;
    div {
      display: flex;
    }
  }
}

.shipping-option-rate-radio-container {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 100%;
  padding: 0px;
  margin-bottom: 24px;

  .custom-control-input {
    position: relative;
  }

  .custom-control-inline {
    margin-right: 0;
  }

  .form-group {
    margin-bottom: 0;
  }

  .custom-radio {
    border-bottom: 1px solid #d9d9d9;
    padding: 12px 24px;
  }

  .custom-radio:last-child {
    border-bottom: none;
  }

  .custom-radio,
  label {
    width: 100%;
  }
}

.shipping-option-rate-contents {
  display: flex;
  width: 100%;
}

.shipping-option-rate-price {
  margin-left: auto;
  font-weight: 500;
}

#credit-card-form {
  padding: 12px;
  padding-bottom: 24px;

  .form-group {
    margin-bottom: 12px;
  }
}
// Style
</style>
