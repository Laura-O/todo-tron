<template>
    <div class="selected-wrapper">
        <div v-for="task in selectedTasks" :key="task.taskId">
            <selected-element :task="task"></selected-element>
        </div>        
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SelectedElement from './SelectedTodos/SelectedElement';

export default {
    name: 'selected-todos',
    components: { SelectedElement },
    methods: {},
    computed: mapGetters({
        selectedTasks: 'allTasks',
    }),
};
</script>

<style>
.selected-wrapper {
    margin: 15px;
}
</style>
