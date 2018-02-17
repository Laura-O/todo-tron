<template>
  <div class="list">
   {{todos}}
  </div>
</template>

<script>
export default {
    name: 'todolist',
    computed: {},
    components: {},
    props: ['todos'],
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link);
        },
    },
};
</script>

<style>

</style>
