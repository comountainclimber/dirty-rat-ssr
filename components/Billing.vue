<template>
  <div>
    <div class="container">
      <b-col md="10" sm="12">
        <ShippingAddressCard />

        <h5>Shipping Method</h5>
        <b-col class="shipping-option-rate-radio-container">
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

                  <div class="shipping-option-rate-price">
                    ${{ rate.price }}
                  </div>
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

        <h5>Payment Method</h5>
        <b-col class="shipping-option-rate-radio-container">
          <b-form-group>
            <b-form-radio-group
              id="radio-slots"
              v-on:change="handlePaymentOptionChange"
              v-model="paymentMethodOptions.selected"
              :options="paymentMethodOptions.options"
              name="radio-options-slots"
            >
              <form
                id="credit-card-form"
                ref="credit-card-form"
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

        <b-col>
          <div id="billing-button-container">
            <b-button
              id="billing-button"
              :disabled="submitDisabled"
              v-on:click="submitBillingForm"
              variant="primary"
            >
              <div v-if="!loading">
                Place My Order
              </div>
              <b-spinner small v-if="loading" label="Spinning"></b-spinner>
            </b-button>
          </div>
        </b-col>
      </b-col>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import ShippingAddressCard from './ShippingAddressCard'

export default {
  name: 'Billing',
  components: { ShippingAddressCard },
  data() {
    return {
      submitDisabled: true,
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
    ...mapState(['checkoutData']),
    ...mapState(['loading'])
  },
  mounted() {
    this.createBraintreeHostedFields()
  },
  methods: {
    ...mapMutations('Billing', ['updateFormField']),
    ...mapActions([
      'submitBillingInformation',
      'setSelectedShippingRate',
      'completeCheckout'
    ]),
    submitBillingForm() {
      this.hostedFieldsInstance.tokenize(async (tokenizeErr, payload) => {
        if (tokenizeErr) {
          return
        }
        await this.completeCheckout(payload.nonce)
        this.$router.push({
          path: '/confirmation'
        })
      })
    },
    handleShippingOptionChange(option) {
      this.setSelectedShippingRate(option)
    },
    handlePaymentOptionChange(option) {
      if (option === 'credit') this.createBraintreeHostedFields()
    },
    createBraintreeHostedFields() {
      const authorization = this.checkoutData.braintree_paypal_client_token

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

      const createHostedFields = (clientInstance) => {
        // eslint-disable-next-line
        braintree.hostedFields.create(
          {
            client: clientInstance,
            styles: {
              input: {
                'font-size': '16px',
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
            this.hostedFieldsInstance = hostedFieldsInstance

            const checkIfSubmitShouldBeDisabled = () => {
              const state = hostedFieldsInstance.getState()
              const formValid = Object.keys(state.fields).every(function(key) {
                return state.fields[key].isValid
              })

              if (formValid) this.submitDisabled = false
            }

            hostedFieldsInstance.on('blur', (event) => {
              checkIfSubmitShouldBeDisabled()
            })

            hostedFieldsInstance.on('validityChange', function(event) {
              checkIfSubmitShouldBeDisabled()
            })
            // TODO: handle hosted fields error here
            if (err) {
              console.log(err)
            }
          }
        )
      }
    }
  }
}
</script>

<style lang="scss">
html {
  background-color: purple;
}
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
  border: 1px solid rgba(0, 0, 0, 0.125);
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
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
