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

        <div class="table-wrapper">
            <table class="table">    
                <thead>
                <tr>
                    <th class="check">S</th>
                    <th class="prio">P</th>
                    <th class="task">T</th>
                    <th class="contexts">C</th>
                    <th class="projects">P</th>
                </tr>
            </thead> 
            </table>
            <table class="table is-fullwidth todo-table is-dark">                
                <tbody class="is-dark">
                    <tr v-for="todo in currentTodos" :key="todo.number">
                        <td class="check"><b-checkbox type="is-danger" v-model="selectedTodos" :native-value="todo" @click="checkTodo()"></b-checkbox></td>
                        <td class="prio">{{todo.priority}}</td>
                        <td class="task">{{todo.text}}</td>
                        <td class="contexts">
                            <p class="p-tags" v-for="(context) in todo.contexts" :key="context" @click="selectContext(context)">{{context}}</p>
                            </td>
                        <td class="projects">
                                <p class="p-tags" v-for="(project) in todo.projects" :key="project" @click="selectProject(project)">{{project}}</p>
                        </td>
                        </tr>
                </tbody>
            </table>
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: '',
            context: '',
            project: '',
            selectedTodos: [],
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
    watch: {
        selectedTodos(selectedTodos) {
            this.$store.commit('selectTodos', selectedTodos);
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
        checkTodo() {
            console.log('todo checked');
        },
    },
};
</script>

<style <style scoped>
.todo-table {
    font-size: 14px;
}

.table-wrapper {
    margin: 15px;
    border-radius: 5px;
    border: 1px solid #01d5da;
    height: 500px;
    padding: 5px;
}

.check,
.prio {
    width: 10px;
}

.task {
    width: 200px;
}

.contexts,
.projects {
    width: 40px;
}

p {
    display: inline-block;
    margin: 5px;
    padding: 2px 3px;
}

p.p-tags {
    border: 2px solid #3f51b5;
    border-radius: 5px;
    transition: border-color 0.45s ease-in-out;
}

p:hover {
    border-color: #ff1744;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

::-webkit-scrollbar {
    width: 10px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

::-webkit-scrollbar-thumb {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    background-color: #01d5da;
    background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
    );
}
</style>
