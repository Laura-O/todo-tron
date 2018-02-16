<template>
  <div class="sidebar">
    <p>one</p>
    <p>one</p>
    <p>one</p>
  </div>
</template>

<script>
export default {
    name: 'sidebar',
    components: {},
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link);
        },
    },
};
</script>

<style>
.sidebar {
    background-color: #202020;
    color: white;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100px;
    z-index: 200;
}
</style>
