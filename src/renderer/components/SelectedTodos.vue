<template>
    <div class="selected-wrapper">
        <div v-for="task in selectedTasks" :key="task.taskId">
            <selected-element :task="task"></selected-element>
        </div>
        <div v-for="task in doneTasks" :key="task.taskId">
            <archived-element :task="task"></archived-element>
        </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SelectedElement from './SelectedTodos/SelectedElement';
import ArchivedElement from './SelectedTodos/ArchivedElement';

export default {
    name: 'selected-todos',
    components: { SelectedElement, ArchivedElement },
    methods: {},
    computed: mapGetters({
        selectedTasks: 'allTasks',
        doneTasks: 'doneTasks',
    }),
};
</script>

<style>
.selected-wrapper {
    margin: 15px;
}
</style>
