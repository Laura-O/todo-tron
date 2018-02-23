const settings = require('electron-settings');

const state = {
    path: '',
    defaultSeconds: null,
    defaultTrayTime: '',
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
    changeDefaultTrayTime(state, setting) {
        state.defaultTrayTime = setting;
        settings.set('defaultTrayTime', setting);
    },
};

const actions = {
    changePath({ commit }, payload) {
        commit('changePath', payload);
    },
    changeDefaultSeconds({ commit }, payload) {
        commit('changeDefaultSeconds', payload);
    },
    changeDefaultTrayTime({ commit }, payload) {
        commit('changeDefaultTrayTime', payload);
    },
};

export default {
    state,
    mutations,
    actions,
};
