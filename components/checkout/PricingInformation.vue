<template>
  <div id="order-summary-panel">
    <h5>Order Summary</h5>

    <div>
      <div id="tooltip-triangle" />
      <div>
        <div
          v-for="item in line_items"
          v-bind:key="item.id"
          class="line-item-column"
        >
          <div class="pricing-info-row">
            <div class="product-image-and-quantity">
              <img :src="item.image" />
              <div class="quantity-count-circle">
                {{ item.quantity }}
              </div>
            </div>

            <span class="product-title">
              {{ item.title }}
            </span>

            <p>${{ item.price }}</p>
          </div>
        </div>

        <div id="discount-code-container">
          <b-form-group
            id="input-group-2"
            label="Discount code:"
            label-for="input-2"
          >
            <b-input-group>
              <b-form-input
                v-model="discount"
                v-validate="'required'"
                name="city"
                type="text"
                placeholder="Discount Code"
              ></b-form-input>
              <template v-slot:append>
                <b-button type="submit" variant="primary">Apply</b-button>
              </template>
            </b-input-group>
          </b-form-group>
        </div>

        <div class="pricing-info-row" id="pricing-summary">
          <div class="info-column">
            <div class="breakdown-row">
              <span class="pricing-summary-label"> Subtotal </span>
              <div>{{ '$' + subtotal }}</div>
            </div>
            <div class="breakdown-row">
              <span class="pricing-summary-label"> Tax</span>
              <div>${{ tax || '0.00' }}</div>
            </div>

            <div class="breakdown-row">
              <span class="pricing-summary-label"> Shipping </span>
              <div>${{ shipping || '0.00' }}</div>
            </div>
          </div>
        </div>

        <div id="total-row" class="pricing-info-row">
          <div class="breakdown-row">
            <div><b>Total</b></div>
            <div>
              <b>{{ '$' + total }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </template>
  </v-popover> -->
  </div>
</template>

<script>
import cart from '../../images/cart.svg'
import dropdown from '../../images/dropdown.svg'

const stripDollarSignAndReturnNumber = (amount) =>
  Number(amount.replace('$', ''))

export default {
  name: 'PricingInformation',
  props: {
    subtotal: {
      type: String,
      required: true,
      default: ''
    },
    total: {
      type: String,
      required: true,
      default: ''
    },
    tax: {
      type: String,
      required: true,
      default: ''
    },
    shipping: {
      type: String,
      required: true,
      default: ''
    },
    line_items: {
      type: Array
    }
  },
  data: () => {
    return {
      cart,
      dropdown,

      discount: ''
    }
  },
  methods: {
    returnTotal: () => {
      return `$${stripDollarSignAndReturnNumber(this.tax) +
        stripDollarSignAndReturnNumber(this.subtotal)}`
    }
  }
}
</script>

<style lang="scss">
#order-summary-panel {
  background-color: #fafafa;
  height: 100%;
  padding: 24px;

  img {
    max-width: 60px;
    min-width: 60px;
    /* min-height: 60px; */
    max-height: 60px;
    border: solid thin grey;
    border-radius: 4px;
  }

  h5 {
    padding-top: 12px;
    padding-bottom: 24px;
  }
}

.pricing-summary-label {
  color: #666;
  font-size: 14px;
}

#discount-code-container {
  border-top: solid thin grey;
  padding: 12px 0;
}

#pricing-summary {
  border-top: solid thin grey;
  padding: 24px 0;
}

.product-title {
  font-size: 14px;
  padding: 0 12px;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.info-column {
  width: 100%;
}

.pricing-info-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.product-image-and-quantity {
  display: flex;
  margin-bottom: 24px;
}

.quantity-count-circle {
  height: 25px;
  width: 25px;
  font-size: 12px;

  margin-bottom: 12px;

  background-color: grey;
  color: white;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -12px;
  margin-top: -12px;
}
</style>
