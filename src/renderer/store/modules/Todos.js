import todotxt from 'todotxt';

const state = {
    todos: [],
};

const mutations = {
    addTodos(state, todos) {
        state.todos = todos;
    },
    changeTodo(state, { number, text }) {
        const newTodoObject = todotxt.parse(text).pop();
        newTodoObject.number = number;
        state.todos[number - 1] = newTodoObject;
    },
};

const getters = {};

const actions = {
    addTodos({ commit }, payload) {
        commit('addTodos', payload);
    },
    changeTodo({ commit }, payload) {
        commit('changeTodo', payload);
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};
