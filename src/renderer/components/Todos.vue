<template>
  <div class="main-wrapper">    
    <div>
       <todo-list :todos="todos" :columns="columns"></todo-list>       
    </div>    
  </div>
</template>

<script>
import TodoList from './Todos/TodoList';
const storage = require('electron').remote.require('electron-settings');
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
        path: {
            get() {
                return this.getPath();
            },
        },
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
    created() {
        if (this.$store.state.Todos.todos.length <= 0) {
            if (storage.has('path')) {
                const path = storage.get('path');
                this.readFile(path);
            }
        }
    },
};
</script>

<style>

</style>
