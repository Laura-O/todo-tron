const state = {
    todos: [],
    selectedTodos: [],
};

const mutations = {
    addTodos(state, todos) {
        state.todos = todos;
    },
    selectTodos(state, selectedTodos) {
        state.selectedTodos = selectedTodos;
    },
};

const getters = {};

const actions = {
    addTodos({ commit }, payload) {
        commit('addTodos', payload);
    },
    selectTodos({ commit }, payload) {
        commit('selectTodos', payload);
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};
