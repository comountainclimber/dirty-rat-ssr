import VeeValidate, { Validator } from 'vee-validate'

// NOTE: We can handle validation localization here

const dict = {
  custom: {
    province: {
      required: 'State is required.'
    },
    first_name: {
      required: 'First name is required.'
    },
    last_name: {
      required: 'Last name is required.'
    },
    address1: {
      required: 'Address is required.'
    },
    country: {
      required: 'Country is required.'
    },
    zip: {
      required: 'Zip is required.'
    },
    email: {
      required: 'Email is required.'
    },
    city: {
      required: 'City is required.'
    },
    billing_phone: {
      required: 'The phone field is required.'
    },
    billing_first_name: {
      required: 'The first name field is required.'
    },
    billing_last_name: {
      required: 'The last name field is required.'
    },
    billing_address1: {
      required: 'The address 1 field is required.'
    },
    billing_city: {
      required: 'The city field is required.'
    },
    billing_province: {
      required: 'The state field is required.'
    },
    billing_zip: {
      required: 'The zip field is required.',
      digits: 'The zip field must be numeric and exactly contain 5 digits.'
    },
    billing_country: {
      required: 'The country field is required.'
    }
  }
}

Validator.localize('en', dict)

export default VeeValidate
