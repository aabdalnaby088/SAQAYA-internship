<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "Hamburger",
        props: {
            isMenuOpen: {
                type: Boolean,
                required: true,
            },
        },
       methods: {
         handleClose() {
            this.$emit("closeHamburger");            
        },
       },


  });
</script>

<template>
      <button class="sideHeader__hamburger" @click="handleClose" :menuOpened="isMenuOpen">
        <span class="sideHeader__bar"></span>
        <span class="sideHeader__bar"></span>
        <span class="sideHeader__bar"></span>
      </button>
</template>

<style scoped>
.sideHeader__hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.sideHeader__bar {
  width: 100%;
  height: 3px;
  background: white;
  transition: all 0.3s ease;
}

.sideHeader__hamburger[menuOpened="true"] .sideHeader__bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.sideHeader__hamburger[menuOpened="true"] .sideHeader__bar:nth-child(2) {
  opacity: 0;
}

.sideHeader__hamburger[menuOpened="true"] .sideHeader__bar:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}
@media (max-width: 768px) {
  .sideHeader__hamburger {
    display: flex;
  }
}
</style>