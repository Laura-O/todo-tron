const state = {
    running: false,
    taskList: [],
};

const mutations = {
    selectTasks(state, selectedTodos) {
        state.taskList = selectedTodos;
    },
};

const getters = {};

const actions = {
    selectTasks({ commit }, payload) {
        commit('selectTasks', payload);
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};
