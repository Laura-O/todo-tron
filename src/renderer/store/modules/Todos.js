const state = {
    todos: [],
    selectedTodos: [],
};

const mutations = {
    addTodos(state, todos) {
        state.todos = todos;
    },
    selectTodo(state, selectTodo) {
        state.selectedTodos = selectTodo;
    },
};

const getters = {};

const actions = {
    addTodos({ commit }, payload) {
        commit('addTodos', payload);
    },
    selectTodo({ commit }, payload) {
        commit('selectTodo', payload);
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};
