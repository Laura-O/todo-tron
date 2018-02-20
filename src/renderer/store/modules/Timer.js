const state = {
    running: false,
    taskList: [],
    assignedTime: [],
};

const mutations = {
    selectTask(state, todo) {
        state.taskList.push(todo);
    },

    removeTask(state, todo) {
        state.taskList.splice(state.taskList.indexOf(todo), 1);
    },
};

const getters = {
    allTasks: (state) => state.taskList,
    taskData: (state) =>
        state.taskList.map((task) => ({
            id: task.number,
        })),
};

const actions = {
    selectTask({ commit }, payload) {
        commit('selectTask', payload);
    },
    removeTask({ commit }, payload) {
        commit('removeTask', payload);
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};
