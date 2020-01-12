<template>
  <div v-if="!customOptions.length">
    <v-select
      :placeholder="placeholder"
      class="rc_select_input"
      :class="{ active: isFocused, 'error-border': hasError }"
      v-bind="$attrs"
      @input="setSelected"
      @search:focus="handleFocus"
      @search:blur="handleBlur"
    />
  </div>
  <div v-else>
    <v-select
      label="title"
      :value="selected"
      :placeholder="placeholder"
      class="rc_select_input"
      :class="{ active: isFocused, 'error-border': hasError }"
      :options="customOptions"
      @search:focus="handleFocus"
      @search:blur="handleBlur"
      @input="setSelected"
    >
      <template slot="option" slot-scope="option">
        <div :class="{ add_option: option.isAddOption }">
          {{ option.title }}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script>
import vSelect from 'vue-select'
// import "vue-select/src/scss/vue-select.scss";

export default {
  name: 'RCSelect',
  components: { vSelect },
  inheritAttrs: false,
  props: {
    customOptions: {
      type: Array,
      required: false,
      default: () => []
    },
    selected: {
      type: [Object, String],
      required: false,
      default: () => ({})
    },
    setSelected: {
      type: Function,
      required: false,
      default: () => undefined
    },
    placeholder: {
      type: String,
      required: false,
      default: () => 'Select an option'
    },
    hasError: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data: function() {
    return {
      isFocused: false
    }
  },
  methods: {
    handleFocus() {
      this.isFocused = true
    },
    handleBlur() {
      this.isFocused = false
    }
  }
}
</script>

<style lang="scss">
/* .rc_select_input, */

.vs__dropdown-toggle {
  border-color: #cccccc;
  border-radius: 2px;
  //border-width: px;
  border: 1px solid #cccccc !important;
  height: 48px !important;
}

.active .vs__dropdown-toggle {
  border-color: #53bad3 !important;
  border-radius: 2px;
  border-width: 2px;
}

.error-border .vs__dropdown-toggle {
  border-color: #ec3d10 !important;
  border-radius: 2px;
  border-width: 2px;
}

.rc_select_input .vs__dropdown-toggle,
.rc_select_input .vs__dropdown-menu {
  border-radius: 2px;
  border-width: 2px;
  padding: 0;
  max-height: 208px;
}

.rc_select_input .vs__dropdown-menu {
  margin-top: 1px;
}

.rc_select_input .add_option {
  font-weight: 500;
  color: #478fa3;
}

.rc_select_input .vs__dropdown-option--highlight {
  background: #eee;
  color: black;
}

.vs__selected {
  color: black !important;
}

.rc_select_input .vs__dropdown-toggle {
  height: 52px;
  border-radius: 0;
}

.rc_select_input .vs__dropdown-option {
  border-width: 2px;
  height: 52px;
  display: flex;
  align-items: center;
  padding: 11px;
  border-top: solid thin #ccc;
}

.rc_select_input.vs__clear,
.rc_select_input .vs__open-indicator {
  fill: #ccc;
}
</style>
