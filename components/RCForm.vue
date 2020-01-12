<template>
  <div>
    <div>
      <form :id="formId">
        <slot />
      </form>
      <div v-if="!excludeSubmit">
        <button c :disabled="submitDisabled" @click="submit">
          {{ submitText }}
        </button>
      </div>
      <!-- <p v-if="submitDisabled && validationError">
                Please correct the errors above.
            </p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'RCForm',
  props: {
    submitText: {
      required: false,
      default: () => 'Submit',
      type: String
    },
    submitDisabled: {
      required: false,
      default: () => false,
      type: Boolean
    },
    validationError: {
      required: false,
      default: () => false,
      type: Boolean
    },
    formId: {
      required: false,
      type: String,
      default: ''
    },
    excludeSubmit: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  methods: {
    submit() {
      this.$emit('form-submitted')
    }
  }
}
</script>

<style lang="scss">
.rc_form {
  max-width: 500px;
  min-width: 500px;
}
</style>
