<template>
  <div>
    <!-- Navbar sempre visibile -->
    <Navbar />

    <!-- Qui Vue Router renderizza le pagine -->
    <div class="home container-fluid mt-4">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar-rent.vue";
import { RouterView } from "vue-router";
</script>

<style scoped>
.home {
  width: 100%;
  overflow-x: hidden;
  font-family: 'Montserrat', sans-serif;
}
.dp__flex_display{
  border: 3px solid black;
  color: red;
}

</style>