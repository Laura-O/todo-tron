<template>
  <div class="list">
      <input placeholder="Filter by Name" icon="search" v-model="searchTerm">
      <div class="field">
            <b-tag v-if="context"
                type="is-primary"
                closable
                @close="context = ''">
                {{context}}
            </b-tag>
            <b-tag v-if="project"
                type="is-primary"
                closable
                @close="project = ''">
                {{project}}
            </b-tag>
        </div>
   <table>
       <thead>
            <tr>
                <th>Prio</th>
                <th>Task</th>
                <th>Contexts</th>
                <th>Projects</th>
            </tr>
       </thead>
       <tbody>
           <tr v-for="todo in currentTodos" :key="todo.number">                
               <td>{{todo.priority}}</td>
               <td>{{todo.text}}</td>
               <td>
                   <p v-for="(context) in todo.contexts" :key="context" @click="selectContext(context)">{{context}}</p>
                </td>
               <td>
                    <p v-for="(project) in todo.projects" :key="project" @click="selectProject(project)">{{project}}</p>
               </td>
            </tr>
       </tbody>
   </table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: '',
            context: '',
            project: '',
        };
    },
    name: 'todolist',
    computed: {
        currentTodos() {
            const searchTerm = this.searchTerm.toLowerCase();
            const context = this.context;
            const project = this.project;

            let currentTodos = this.todos;

            currentTodos = currentTodos.filter((todo) =>
                todo.text.toLowerCase().includes(searchTerm),
            );

            if (context) {
                currentTodos = currentTodos.filter((todo) => todo.contexts.indexOf(context) > -1);
            }

            if (project) {
                currentTodos = currentTodos.filter((todo) => todo.projects.indexOf(project) > -1);
            }

            return currentTodos;
        },
    },
    components: {},
    props: ['todos'],
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link);
        },
        selectContext(context) {
            this.context = context;
        },
        selectProject(project) {
            this.project = project;
        },
    },
};
</script>

<style>

</style>
