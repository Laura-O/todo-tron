<template>
  <div class="main-wrapper">    
    <button @click="openTodos">Button</button>
    <div>
       <todo-list :todos="todos" :columns="columns"></todo-list>
    </div>
  </div>
</template>

<script>
import TodoList from './Todos/TodoList';

const fs = require('fs');
const todotxt = require('todotxt');

export default {
    name: 'todos',
    data() {
        return {
            columns: ['Priority', 'Task', 'Context', 'Projects'],
        };
    },
    computed: {
        todos: {
            get() {
                return this.$store.state.Todos.todos;
            },
            set(value) {
                this.$store.commit('addTodos', value);
            },
        },
    },
    components: { TodoList },
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link);
        },
        openTodos() {
            const self = this;
            const dialog = this.$electron.remote.dialog;
            dialog.showOpenDialog(
                {
                    filters: [
                        {
                            name: 'Documents',
                            extensions: ['txt', 'md'],
                        },
                    ],
                    properties: ['openFile'],
                },
                (item) => {
                    if (item) {
                        self.readFile(item[0]);
                    }
                },
            );
        },
        readFile(path) {
            const self = this;

            fs.readFile(path, 'utf8', (err, content) => {
                if (err === null) {
                    const allLines = content.split(/\r\n|\n/);
                    // Filter empty lines in array
                    const rawTodos = allLines.filter((x) => x !== (undefined || null || ''));
                    this.todos = todotxt.parse(rawTodos);
                    this.$store.commit('addTodos', todotxt.parse(rawTodos));
                } else {
                    self.openDialog('error', err.toString());
                }
            });
        },
    },
};
</script>

<style>

</style>
