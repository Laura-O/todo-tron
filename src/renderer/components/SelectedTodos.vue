<template>
    <div class="selected-wrapper">
        <div v-for="todo in selectedTodos" :key="todo.number">
            <selected-element :todo="todo"></selected-element>
        </div>
  </div>
</template>

<script>
import SelectedElement from './SelectedTodos/SelectedElement';

export default {
    name: 'selected-todos',
    components: { SelectedElement },
    methods: {},
    computed: {
        selectedTodos() {
            return this.$store.state.Timer.taskList;
        },
    },
};
</script>

<style>
.selected-wrapper {
    margin: 10px;
}
</style>
