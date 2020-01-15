<template>
  <div>
    <b-form @submit="submit">
      <b-container>
        <b-row>
          <b-col md="12">
            <h5>Customer Information</h5>
            <b-form-group
              id="email-input-group"
              class="form-label-group"
              label="Email:"
              label-for="email-input"
            >
              <b-form-input
                id="email-input"
                :class="{ 'is-invalid': errors.first('email') }"
                v-model="email"
                v-validate="'required'"
                type="text"
                placeholder="Email Address"
                class="form-control"
                name="email"
              ></b-form-input>
              <small v-if="errors.first('email')" class="text-danger">
                {{ errors.first('email') }}
              </small>
            </b-form-group>
          </b-col>
        </b-row>
        <div id="shipping-address-form">
          <b-row>
            <b-col md="12">
              <h5>Shipping Address Shipping Address Shipping Address</h5>
            </b-col>
            <b-col md="6">
              <b-form-group
                id="first-name-input-group"
                label="First Name:"
                label-for="first-name-input"
              >
                <b-form-input
                  id="first-name-input"
                  :class="{ 'is-invalid': errors.first('first_name') }"
                  v-model="first_name"
                  v-validate="'required'"
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                ></b-form-input>
                <small v-if="errors.first('first_name')" class="text-danger">
                  {{ errors.first('first_name') }}
                </small>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                id="last-name-input-group"
                label="Last Name:"
                label-for="last-name-input"
              >
                <b-form-input
                  id="last-name-input"
                  :class="{ 'is-invalid': errors.first('last_name') }"
                  v-model="last_name"
                  v-validate="'required'"
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                ></b-form-input>
                <small v-if="errors.first('last_name')" class="text-danger">
                  {{ errors.first('last_name') }}
                </small>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="12">
              <b-form-group
                id="company-input-group"
                class="form-label-group"
                label="Company:"
                label-for="company-input"
              >
                <b-form-input
                  id="company-input"
                  v-model="company"
                  type="text"
                  placeholder="Company (optional)"
                  class="form-control"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="8">
              <b-form-group
                id="address1-input-group"
                label="Address:"
                label-for="address1-input"
              >
                <b-form-input
                  id="address1-input"
                  :class="{ 'is-invalid': errors.first('address1') }"
                  v-model="address1"
                  v-validate="'required'"
                  name="address1"
                  type="text"
                  placeholder="Address"
                ></b-form-input>
                <small v-if="errors.first('address1')" class="text-danger">
                  {{ errors.first('address1') }}
                </small>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                id="address2-input-group"
                label="Apt, suite, etc.:"
                label-for="address2-input"
              >
                <b-form-input
                  id="address2-input"
                  v-model="address2"
                  name="address2"
                  type="text"
                  placeholder="Apt, suite, etc. (optional)"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="12">
              <b-form-group
                id="city-input-group"
                label="City:"
                label-for="city-input"
              >
                <b-form-input
                  id="city-input"
                  :class="{ 'is-invalid': errors.first('city') }"
                  v-model="city"
                  v-validate="'required'"
                  name="city"
                  type="text"
                  placeholder="City"
                ></b-form-input>
                <small v-if="errors.first('city')" class="text-danger">
                  {{ errors.first('city') }}
                </small>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group
                id="country-input-group"
                label="Country:"
                label-for="country-input"
              >
                <b-form-select
                  id="country-input"
                  v-model="country"
                  :options="countryOptions"
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.first('country') }"
                  name="country"
                ></b-form-select>
                <small v-if="errors.first('country')" class="text-danger">
                  {{ errors.first('country') }}
                </small>
              </b-form-group>
            </b-col>
            <b-col md="5">
              <b-form-group
                id="province-input-group"
                :label="countries[country].label + ':'"
                label-for="province-input"
              >
                <b-form-select
                  id="province-input"
                  v-model="province"
                  :options="countries[country].provinces"
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.first('province') }"
                  name="province"
                ></b-form-select>
                <small v-if="errors.first('province')" class="text-danger">
                  {{ errors.first('province') }}
                </small>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group
                id="zip-input-group"
                :label="countries[country].zip_label + ':'"
                label-for="zip-input"
              >
                <b-form-input
                  id="zip-input"
                  :class="{ 'is-invalid': errors.first('zip') }"
                  v-model="zip"
                  v-validate="'required'"
                  name="zip"
                  type="text"
                  :placeholder="countries[country].zip_label"
                ></b-form-input>
                <small v-if="errors.first('zip')" class="text-danger">
                  {{ errors.first('zip') }}
                </small>
              </b-form-group>
            </b-col>
          </b-row>
        </div>

        <b-row
          id="shipping-form-button-container"
          class="justify-content-between"
        >
          <b-button type="submit" variant="secondary">Return to cart</b-button>
          <b-button
            id="add-shipping-info-button"
            :disabled="submitDisabled"
            type="submit"
            variant="primary"
          >
            <div v-if="!loading">
              Add Shipping Information
            </div>
            <b-spinner small v-if="loading" label="Spinning"></b-spinner>
          </b-button>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import isEmpty from 'lodash/isEmpty'

import countries from '../utils/countries.json'

const { mapFields } = createHelpers({
  getterType: 'shippingAddress/getForm',
  mutationType: 'shippingAddress/updateFormField'
})

export default {
  name: 'ShippingAddressForm',

  data() {
    return {
      countryOptions: ['United States', 'Canada'],
      countries
    }
  },
  computed: {
    ...mapState(['subtotal', 'loading', 'checkoutData']),
    ...mapState('shippingAddress', ['form']),
    ...mapFields([
      'email',
      'phone',
      'first_name',
      'last_name',
      'address1',
      'address2',
      'company',
      'city',
      'province',
      'zip',
      'country'
    ]),
    submitDisabled() {
      return !isEmpty(this.errors.collect())
    },
    shipping_address: (state) =>
      state.checkoutData &&
      state.checkoutData.cart_contents &&
      state.checkoutData.cart_contents.shipping_address
  },
  mounted() {},
  methods: {
    ...mapActions('shippingAddress', ['updateShippingAddress', 'setForm']),
    ...mapMutations('shippingAddress', ['updateFormField']),
    ...mapActions([
      'submitShippingInformation',
      'updateCheckout',
      'getShippingData'
    ]),
    submit(e) {
      e.preventDefault()
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          const comparisonForm = { ...this.form }
          delete comparisonForm.email

          const sortKeysAndReturnSortedObject = (object = {}) => {
            if (!object) object = {}
            const newObject = {}
            Object.keys(object)
              .sort()
              .forEach((key) => {
                newObject[key] = object[key]
              })

            return newObject
          }

          if (
            JSON.stringify(sortKeysAndReturnSortedObject(comparisonForm)) !==
            JSON.stringify(sortKeysAndReturnSortedObject(this.shipping_address))
          ) {
            await this.updateCheckout({ shipping_address: this.form })
            await this.getShippingData()
          }

          this.$router.push({
            path: `/billing-information/${this.checkoutData.cart_id_or_token}`
          })
        }
      })
    }
  },
  template: '#shippingAddressForm'
}
</script>

<style lang="scss">
#shipping-form-button-container {
  padding: 15px;
}

#shipping-address-form {
  margin-top: 12px;
}

#add-shipping-info-button {
  min-width: 209px;
}
</style>
