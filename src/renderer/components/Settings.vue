<template>
  <div id="wrapper">    

  <div>

  </div>
  </div>
</template>

<script>
export default {
    name: 'main-view',
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
