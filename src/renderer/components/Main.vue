<template>
  
    <todos></todos>
  
</template>

<script>
import Todos from './Todos';

export default {
    name: 'main-view',
    components: { Todos },
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link);
        },
    },
};
</script>

<style>

</style>
