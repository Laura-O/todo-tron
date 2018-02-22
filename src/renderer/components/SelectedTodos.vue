<template>
    <div class="selected-wrapper" v-if="selectedTasks.length > 0 || doneTasks.length > 0">
        <div v-for="task in selectedTasks" :key="task.taskId">
            <selected-element :task="task"></selected-element>
        </div>        
        <div v-for="task in doneTasks" :key="task.taskId">            
            <archived-element :task="task"></archived-element>
        </div>
     </div>
     <div class="selected-wrapper" v-else>
         <div></div>
         <button @click="showArchive">show</button>         
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SelectedElement from './SelectedTodos/SelectedElement';
import ArchivedElement from './SelectedTodos/ArchivedElement';

export default {
    name: 'selected-todos',
    components: { SelectedElement, ArchivedElement },
    methods: {
        showArchive() {
            console.log(this.doneTasks);
        },
    },
    computed: mapGetters({
        selectedTasks: 'allTasks',
        doneTasks: 'doneTasks',
    }),
};
</script>

<style>
.selected-wrapper {
    padding: 15px;
    background-color: #2d2f31;
    color: white;
    height: 477px;
}
</style>
