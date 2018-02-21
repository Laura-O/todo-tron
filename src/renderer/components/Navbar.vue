<template>
<nav class="navbar is-dark">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">      
      <img src="../assets/main_logo.png" alt="" srcset="">
    </a>
    <router-link to="/main" class="navbar-item" active-class="is-active">Main</router-link>
    <router-link to="/selected" class="navbar-item" active-class="is-active">Selected</router-link>    
    <router-link to="/settings" class="navbar-item" active-class="is-active">Settings</router-link>    
  </div>
</nav>
  
</template>

<script>
export default {
    name: 'Navbar',
};
</script>

<style>

</style>
