<template>
  <div id="wrapper">    
    <sidebar></sidebar>
  </div>
</template>

<script>
import Sidebar from './Sidebar';

export default {
    name: 'main-view',
    components: { Sidebar },
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link);
        },
    },
};
</script>

<style>

</style>
