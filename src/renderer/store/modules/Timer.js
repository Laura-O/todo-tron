const state = {
    running: false,
    taskList: [],
    assignedTime: [],
};

const mutations = {
    selectTask(state, todo) {
        // state.taskList.push(todo);
        const uniqueId =
            Math.random()
                .toString(36)
                .substring(2) + new Date().getTime().toString(36);
        const newTask = {
            taskId: uniqueId,
            todoId: todo.number,
            text: todo.text,
            seconds: 20,
            done: false,
        };
        state.taskList.push(newTask);
    },

    removeTask(state, todo) {
        state.taskList.splice(state.taskList.indexOf(todo), 1);
    },

    setTime(state, { todo, seconds }) {
        state.assignedTime[todo.number] = seconds;
    },
};

const getters = {
    allTasks: (state) => state.taskList,
    taskData(state) {
        return state.taskList.map((task) => ({
            id: task.number,
            text: task.text,
            seconds: state.assignedTime[task.number] || 20,
        }));
    },
};

const actions = {
    selectTask({ commit }, payload) {
        commit('selectTask', payload);
    },
    removeTask({ commit }, payload) {
        commit('removeTask', payload);
    },
    setTime({ commit }, payload) {
        commit('setTime', payload);
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};
