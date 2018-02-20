const state = {
    taskList: [],
    assignedTime: [],
    currentTask: [],
};

const mutations = {
    selectTask(state, todo) {
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
    setCurrentTask(state) {
        state.currentTask = state.taskList[0];
    },
    updateCurrentSeconds(state, seconds) {
        state.currentTask.seconds = seconds;
        state.taskList[0].seconds = seconds;
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
    moveTaskUp({ commit }, payload) {
        commit('moveTaskUp', payload);
    },
    moveTaskDown({ commit }, payload) {
        commit('moveTaskDown', payload);
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};
