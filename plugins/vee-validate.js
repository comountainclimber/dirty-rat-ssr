import Vue from 'vue'
import {
  Validator,
  install as VeeValidate
} from 'vee-validate/dist/vee-validate.minimal.esm.js'
import { required } from 'vee-validate/dist/rules.esm.js'

import { dict } from '../utils/validation'

// Vue.use(Validation)

// import veeEn from 'vee-validate/dist/locale/en';

// Add the rules you need.
Validator.extend('required', required)

// Merge the messages.
Validator.localize('en', dict)

// install the plugin
Vue.use(VeeValidate)
