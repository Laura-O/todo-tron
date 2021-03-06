<template>
  <div class="list">
      <div class="top-wrapper">
        <b-input size="is-small" placeholder="Filter by Name" icon="search" v-model="searchTerm"></b-input>
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
        </div>

        <div class="header-wrapper">
            <table class="table table-header">    
                <thead>
                <tr>                    
                    <th class="prio"><font-awesome-icon :icon="prioIcon" class="green-glow" /></th>
                    <th class="task"><font-awesome-icon :icon="listIcon" class="green-glow" /></th>
                    <th class="contexts"><font-awesome-icon :icon="locationIcon" class="green-glow" /></th>
                    <th class="projects"><font-awesome-icon :icon="projectIcon" class="green-glow" /></th>
                </tr>
            </thead> 
            </table>
        </div>

        <div class="table-wrapper">            
            <table class="table todo-table is-dark">                
                <tbody class="is-dark">                     
                    <tr v-for="todo in currentTodos" :key="todo.number">                        
                        <td class="prio"><p v-if="todo.priority.length !== 0">{{todo.priority}}</p></td>
                        <td class="task" @click="cardModal(todo)">{{todo.text}}</td>
                        <td class="contexts">
                            <p class="p-tags" v-for="(context) in todo.contexts" :key="context" @click="selectContext(context)">{{context}}</p>
                            </td>
                        <td class="projects">
                                <p class="p-tags" v-for="(project) in todo.projects" :key="project" @click="selectProject(project)">{{project}}</p>
                        </td>
                        <td>
                            <font-awesome-icon :icon="plusSquare" class="green-glow add-x-button" @click="checkTodo(todo)"/>
                            <font-awesome-icon :icon="xSquare" class="green-glow add-x-button" @click="uncheckTodo(todo)"/>
                        </td>
                    </tr>                            
                </tbody>
            </table>
        </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faThermometerHalf from '@fortawesome/fontawesome-free-solid/faThermometerHalf';
import falocationArrow from '@fortawesome/fontawesome-free-solid/faLocationArrow';
import falistul from '@fortawesome/fontawesome-free-solid/faListUl';
import faarchive from '@fortawesome/fontawesome-free-solid/faArchive';
import faPlusSquare from '@fortawesome/fontawesome-free-regular/faPlusSquare';
import faMinusSquare from '@fortawesome/fontawesome-free-regular/faMinusSquare';
import faTimesSquare from '@fortawesome/fontawesome-pro-regular/faTimesSquare';

import CardModal from '../Global/CardModal';

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
        todos() {
            return this.$store.state.Todos.todos;
        },
        currentTodos() {
            const searchTerm = this.searchTerm;
            const context = this.context;
            const project = this.project;

            let currentTodos = this.todos;

            if (searchTerm) {
                currentTodos = currentTodos.filter((todo) =>
                    todo.text.toLowerCase().includes(searchTerm),
                );
            }

            if (context) {
                currentTodos = currentTodos.filter(
                    (todo) => todo.contexts.indexOf(context) > -1,
                );
            }

            if (project) {
                currentTodos = currentTodos.filter(
                    (todo) => todo.projects.indexOf(project) > -1,
                );
            }

            return currentTodos;
        },
        selectedTodos() {
            return this.$store.state.Tasklist.taskList;
        },
        prioIcon() {
            return faThermometerHalf;
        },
        locationIcon() {
            return falocationArrow;
        },
        listIcon() {
            return falistul;
        },
        projectIcon() {
            return faarchive;
        },
        plusSquare() {
            return faPlusSquare;
        },
        minusSquare() {
            return faMinusSquare;
        },
        xSquare() {
            return faTimesSquare;
        },
    },
    components: { FontAwesomeIcon },
    // props: ['todos'],
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
        checkTodo(todo) {
            this.$store.commit('selectTask', todo);
            this.$store.commit('setCurrentTask', todo);
        },
        uncheckTodo(todo) {
            this.$store.commit('removeTask', todo);
        },
        notSelected(todo) {
            if (this.selectedTodos.indexOf(todo) > -1) {
                return false;
            }
            return true;
        },
        cardModal(todo) {
            this.$modal.open({
                parent: this,
                component: CardModal,
                hasModalCard: true,
                props: {
                    todo,
                },
            });
        },
    },
};
</script>

<style scoped>
.top-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0 40px 0 20px;
}

.todo-table {
    font-size: 14px;
}

.table-wrapper {
    margin: 0 15px;
    border-radius: 5px;
    border: 2px solid #01d5da;
    height: 400px;
    padding: 5px;
}

.table thead td,
.table thead th {
    border: none;
}

.header-wrapper {
    margin: 0 15px;
    padding: 5px;
    border: none;
}

.table {
    table-layout: fixed;
    font-size: 14px;
    background-color: #2d2f31;
    color: white;
}

.table-header {
    margin-bottom: 0px;
}

.prio {
    width: 10px;
}

.add-x-button {
    transition: color 0.45s ease-in-out;
}

.add-x-button:hover {
    color: #f84aa7;
}

td.prio,
td.contexts {
    padding-left: 0px;
}

.task {
    width: 250px;
}

.contexts,
.projects {
    width: 100px;
}

.prio p {
    font-size: 12px;
    border: 2px solid #01d5da;
    border-radius: 15%;
}

th {
    border: none;
}

.todo-table tr {
    border-bottom: 1px solid #f84aa7;
}

p {
    display: inline-block;
    margin: 2px;
    padding: 2px 2px;
}

p.p-tags {
    font-size: 10px;
    border: 2px solid #01d5da;
    border-radius: 5px;
    transition: border-color 0.45s ease-in-out;
}

p:hover {
    border-color: #f84aa7;
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
