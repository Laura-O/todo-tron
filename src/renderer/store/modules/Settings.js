const settings = require('electron-settings');

const state = {
    path: '',
};

const mutations = {
    changePath(state, path) {
        state.path = path;
        settings.set('path', path);
    },
};

const actions = {
    changePath({ commit }, payload) {
        commit('changePath', payload);
    },
};

export default {
    state,
    mutations,
    actions,
};
