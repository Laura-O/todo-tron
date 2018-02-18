<template>
  <div id="wrapper">    
      <button @click="openTodos">Button</button>
  <div>

  </div>
  </div>
</template>

<script>
export default {
    name: 'settings',
    components: {},
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link);
        },
    },
};
</script>

<style>

</style>
