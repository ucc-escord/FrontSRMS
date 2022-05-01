<template>
  <div id="material-kit">
    <div :class="{ 'nav-open': NavbarStore.showNavbar }">
      <router-view name="header" />
      <div>
        <esc-studDash/>
        <!-- <router-view /> -->
      </div>
      <router-view name="footer" />
    </div>
  </div>
</template>

<script>
import studDash from "./escord-components/Student/studDashboard.vue";

export default {
  components:{
    "esc-studDash": studDash
  }  
}
</script>