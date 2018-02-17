const state = {
    todos: [],
};

const mutations = {
    addTodos(state, todos) {
        state.todos = todos;
    },
};

const getters = {};

const actions = {
    addTodos({ commit }, payload) {
        commit('addTodos', payload);
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};
