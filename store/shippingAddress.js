import { updateField, getField } from 'vuex-map-fields'

export const ORIGINAL_FORM_STATE = {
  phone: '',
  first_name: '',
  last_name: '',
  address1: '',
  address2: '',
  company: '',
  city: '',
  province: '',
  zip: '',
  country: 'United States',
  email: ''
}

export const state = () => ({
  list: [],
  form: { ...ORIGINAL_FORM_STATE }
})

export const mutations = {
  setForm(state, address = { ...ORIGINAL_FORM_STATE }) {
    const {
      phone,
      first_name,
      last_name,
      address1,
      address2,
      company,
      city,
      province,
      zip,
      country,
      id,
      email
    } = address
    const form = {
      phone,
      first_name,
      last_name,
      address1,
      address2,
      company,
      city,
      province,
      zip,
      country,
      id,
      email
    }
    state.form = form
  },
  updateFormField({ form }, field) {
    updateField(form, field)
  }
}

export const getters = {
  getForm({ form }) {
    return getField(form)
  }
}
