<template>
  <!-- <transition name="fade"> -->
  <div id="overlay">asdasd</div>
  <!-- </transition> -->
</template>

<script>
export default {
  name: "Overlay"
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
#overlay {
  position: fixed; /* Sit on top of the page content */

  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}
</style>
