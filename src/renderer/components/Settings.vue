<template>
  <div id="wrapper">    
    <sidebar></sidebar>
  <div>

  </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar';
import Todos from './Todos';

export default {
    name: 'main-view',
    components: { Sidebar, Todos },
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link);
        },
    },
};
</script>

<style>

</style>
