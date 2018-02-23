const settings = require('electron-settings');
const state = {
    taskList: [],
    archiveList: [],
    assignedTime: [],
    currentTask: [],
};

const mutations = {
    selectTask(state, todo) {
        const uniqueId =
            Math.random()
                .toString(36)
                .substring(2) + new Date().getTime().toString(36);
        const defaultSeconds = settings.get('defaultSeconds');
        const newTask = {
            taskId: uniqueId,
            todoId: todo.number,
            text: todo.text,
            seconds: defaultSeconds,
            totalSeconds: defaultSeconds,
            done: false,
        };
        state.taskList.push(newTask);
    },
    removeTask(state, todo) {
        const index = state.taskList.findIndex((task) => task.todoId === todo.number);
        state.taskList.splice(index, 1);
    },
    setTime(state, { todo, seconds }) {
        state.assignedTime[todo.number] = seconds;
    },
    setCurrentTask(state) {
        state.currentTask = state.taskList[0];
    },
    updateCurrentSeconds(state, seconds) {
        state.currentTask.seconds = seconds;
        state.taskList[0].seconds = seconds;
    },
    updateSeconds(state, { newValue, id }) {
        const index = state.taskList.findIndex((task) => task.taskId === id);
        const newTaskList = state.taskList;
        newTaskList[index].seconds = newValue;
        state.taskList = newTaskList;
    },
    updateTotalSeconds(state, { newValue, id }) {
        const index = state.taskList.findIndex((task) => task.taskId === id);
        const newTaskList = state.taskList;
        newTaskList[index].totalSeconds = newValue;
        state.taskList = newTaskList;
        if (index === 0) {
            state.currentTask.totalSeconds = newValue;
            state.currentTask.seconds = newValue;
        }
    },
    moveTaskUp(state, id) {
        const index = state.taskList.findIndex((task) => task.taskId === id);
        if (index > 0) {
            const taskElement = state.taskList[index];
            const newTaskList = state.taskList;
            newTaskList.splice(index, 1);
            newTaskList.splice(index - 1, 0, taskElement);
            state.taskList = newTaskList;
            state.currentTask = state.taskList[0];
        }
    },
    moveTaskDown(state, id) {
        const index = state.taskList.findIndex((task) => task.taskId === id);
        if (index < state.taskList.length) {
            const taskElement = state.taskList[index];
            const newTaskList = state.taskList;
            newTaskList.splice(index, 1);
            newTaskList.splice(index + 1, 0, taskElement);
            state.taskList = newTaskList;
            state.currentTask = state.taskList[0];
        }
    },
    archiveTask(state) {
        state.archiveList.push(state.currentTask);
        state.taskList.shift();
        if (state.taskList.length !== 0) {
            state.currentTask = state.taskList[0];
        }
    },
    resetTimer(state) {
        state.currentTask.seconds = state.currentTask.totalSeconds;
        state.taskList[0].seconds = state.currentTask.totalSeconds;
    },
};

const getters = {
    allTasks: (state) => state.taskList,
    doneTasks: (state) => state.archiveList,
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
        commit('setCurrentTask', payload);
    },
    removeTask({ commit }, payload) {
        commit('removeTask', payload);
    },
    setTime({ commit }, payload) {
        commit('setTime', payload);
    },
    setCurrentTask({ commit }, payload) {
        commit('setCurrentTask', payload);
    },
    updateCurrentSeconds({ commit }, payload) {
        commit('updateCurrentSeconds', payload);
    },
    updateTotalSeconds({ commit }, payload) {
        commit('updateTotalSeconds', payload);
    },
    updateSeconds({ commit }, payload) {
        commit('updateSeconds', payload);
    },
    moveTaskUp({ commit }, payload) {
        commit('moveTaskUp', payload);
    },
    moveTaskDown({ commit }, payload) {
        commit('moveTaskDown', payload);
    },
    archiveTask({ commit }, payload) {
        commit('archiveTask', payload);
    },
    resetTimer({ commit }) {
        commit('resetTimer');
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};
