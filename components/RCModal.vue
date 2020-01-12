<template>
  <transition name="fade">
    <div v-show="show" class="rc_modal__container" @click="close">
      <div class="rc_modal">
        <div class="rc_modal__header">
          <div class="rc_modal__header__title">
            <h2>{{ title }}</h2>
          </div>
          <div class="rc_modal__header__actions">
            <button type="button" class="rc_modal__close" @click.stop="close">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>
        <div class="rc_modal__content">
          <slot></slot>
        </div>
        <div class="rc_modal__actions">
          <button
            type="button"
            class="rc_button rc_button--block"
            :class="submitClass"
            @click="submit"
          >
            {{ submitText }}
          </button>
          <button
            type="button"
            class="rc_button rc_button--block"
            :class="cancelClass"
            @click.stop="close"
          >
            {{ cancelText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RCModal",
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    submitText: {
      type: String,
      required: false,
      default: "Submit"
    },
    cancelText: {
      type: String,
      required: false,
      default: "Cancel"
    },
    /*
            Components can apply the danger modifier to the Submit button
            by passing submitClass as 'danger', i.e. as a "do you really want to do this"
            indicator.
        */
    submitClass: {
      type: String,
      required: false,
      default: ""
    },
    /*
            Components can override the danger modifier on the Cancel button
            by passing any string as cancelClass, i.e. for situations where
            Cancel should be the 'recommended' option and Submit should be the
            'danger' option.
        */
    cancelClass: {
      type: String,
      required: false,
      default: "rc_button--danger"
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit");
    }
  }
};
</script>

<style>
.rc_modal__container {
  display: inline-block;
  opacity: 1;
  transition: none;
}

.rc_modal__header__title {
  text-align: left;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
