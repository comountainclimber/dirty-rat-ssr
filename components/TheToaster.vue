<template>
  <ul class="rc_toaster">
    <transition-group name="toast">
      <RCToastNotification
        v-for="n in toastNotifications"
        :key="n.message"
        :notification="n"
      />
    </transition-group>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import RCToastNotification from "./shared/RCToastNotification.vue";

export default {
  name: "TheToaster",
  components: { RCToastNotification },
  computed: {
    ...mapState({
      toastNotifications: state => state.Notifications.toastNotifications
    })
  },
  methods: {}
};
</script>

<style>
ul.rc_toaster {
  transform: none;
  -webkit-transform: none;
  transition: none;
  -webkit-transition: none;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 1s;
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
