const settings = require('electron-settings');

const state = {
    path: '',
    defaultSeconds: 25,
};

const mutations = {
    changePath(state, path) {
        state.path = path;
        settings.set('path', path);
    },
    changeDefaultSeconds(state, seconds) {
        state.defaultSeconds = seconds;
        settings.set('defaultSeconds', seconds);
    },
};

const actions = {
    changePath({ commit }, payload) {
        commit('changePath', payload);
    },
    changeDefaultSeconds({ commit }, payload) {
        commit('changeDefaultSeconds', payload);
    },
};

export default {
    state,
    mutations,
    actions,
};
