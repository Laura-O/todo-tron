<template>
    <div class="selected-wrapper">
        <div v-for="todo in selectedTodos" :key="todo.number">
            <selected-element :todo="todo"></selected-element>
        </div>
        <timer></timer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SelectedElement from './SelectedTodos/SelectedElement';
import Timer from './Timer';

export default {
    name: 'selected-todos',
    components: { SelectedElement, Timer },
    methods: {},
    computed: mapGetters({
        selectedTodos: 'allTasks',
    }),
};
</script>

<style>
.selected-wrapper {
    margin: 10px;
}
</style>
