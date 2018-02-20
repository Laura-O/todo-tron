const state = {
    running: false,
};

const mutations = {
    startTimer(state) {
        state.running = true;
    },
    stopTimer(state) {
        state.running = false;
    },
};

const getters = {};

const actions = {
    startTimer({ commit }) {
        commit('startTimer');
    },
    stopTimer({ commit }) {
        commit('stopTimer');
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};
