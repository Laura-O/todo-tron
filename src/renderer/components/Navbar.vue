<template>
<nav class="navbar is-dark">
  <div class="navbar-brand">
    <a class="navbar-item logo" href="/">      
      <img src="../assets/main_logo.png" alt="" srcset="">
    </a>
    <router-link to="/main" class="navbar-item" active-class="is-active">Main</router-link>
    <router-link to="/selected" class="navbar-item" active-class="is-active">
      Selected <span v-if="this.selectedLength > 0">&nbsp;({{this.selectedLength}})</span>
    </router-link>    
    <router-link to="/settings" class="navbar-item" active-class="is-active">Settings</router-link>    
  </div>
</nav>
  
</template>

<script>
export default {
    name: 'Navbar',
    computed: {
        selectedLength() {
            return this.$store.state.Tasklist.taskList.length;
        },
    },
};
</script>

<style>
.navbar-brand {
    font-size: 14px;
    justify-content: flex-start;
    margin-right: 50px;
}

.logo {
    margin-right: 50px;
}
</style>
