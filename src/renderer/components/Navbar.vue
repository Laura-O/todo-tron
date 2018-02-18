<template>
<nav class="navbar is-dark">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </a>
    <router-link to="/main" class="navbar-item" active-class="is-active">Main</router-link>
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
