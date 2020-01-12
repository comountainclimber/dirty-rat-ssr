import { updateField } from 'vuex-map-fields'

export const ORIGINAL_FORM_STATE = {
  cardNumber: '',
  expiration: '',
  cvv: '',
  firstName: '',
  lastName: ''
}

export const state = () => ({
  list: [],
  form: { ...ORIGINAL_FORM_STATE }
})

export const mutations = {
  setForm(state, billingInfo = { ...ORIGINAL_FORM_STATE }) {
    const { cardNumber, expiration, cvv, firstName, lastName } = billingInfo
    const form = {
      cardNumber,
      expiration,
      cvv,
      firstName,
      lastName
    }
    state.form = form
  },
  updateFormField({ form }, field) {
    updateField(form, field)
  }
}
