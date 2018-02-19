<template>
    <div>
        <div v-for="todo in selectedTodos" :key="todo.number">
            {{todo.text}}
        </div>
  </div>
</template>

<script>
export default {
    name: 'selected-todos',
    components: {},
    methods: {},
    computed: {
        selectedTodos() {
            return this.$store.state.Todos.selectedTodos;
        },
    },
};
</script>

<style>

</style>
