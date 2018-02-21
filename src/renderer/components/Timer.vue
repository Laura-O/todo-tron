<template>
    <div class="timer-wrapper">
        <div v-if="selectedLength <= 0" class="empty-timer">
            Please select a task
        </div>
        <div v-else>
            <div class="button-wrapper">
                <div>
                    <a class="button is-primary is-small" v-on:click="startTimer">
                        <font-awesome-icon :icon="playButton" />            
                    </a>
                    <a class="button is-primary is-small" v-on:click="stopTimer">
                        <font-awesome-icon :icon="pauseButton" />            
                    </a>
                    <a class="button is-primary is-small" v-on:click="resetTimer">
                        <font-awesome-icon :icon="redoButton" />            
                    </a>
                </div>
                <div class="time-wrapper">
                    {{currentSeconds}}                
                </div>      
            </div>
            <div>
                <progress class="progress is-primary" :value="currentSeconds" :max="totalSeconds"></progress>
            </div>
        </div>        
    </div>
</template>

<script>
// import { ipcRenderer } from 'electron';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faPlay from '@fortawesome/fontawesome-pro-regular/faPlay';
import faPause from '@fortawesome/fontawesome-pro-regular/faPause';
import faRedo from '@fortawesome/fontawesome-pro-regular/faRedo';

export default {
    name: 'timer',
    data() {
        return {};
    },
    components: { FontAwesomeIcon },
    props: [],
    computed: {
        currentSeconds: {
            get() {
                return this.$store.state.Tasklist.currentTask.seconds;
            },
            set(newValue) {
                this.$store.commit('updateCurrentSeconds', newValue);
            },
        },
        totalSeconds() {
            return this.$store.state.Tasklist.currentTask.totalSeconds;
        },
        selectedLength() {
            return this.$store.state.Tasklist.taskList.length;
        },
        playButton() {
            return faPlay;
        },
        pauseButton() {
            return faPause;
        },
        redoButton() {
            return faRedo;
        },
    },
    methods: {
        startTimer() {
            this.timer = window.setInterval(this.timerTick, 1000);
            this.$store.commit('startTimer');
        },
        stopTimer() {
            window.clearInterval(this.timer);
            this.$store.commit('stopTimer');
        },
        resetTimer() {
            this.$store.commit('resetTimer');
        },
        timerTick() {
            if (this.currentSeconds !== 0) {
                this.currentSeconds -= 1;
                this.updateTray(this.currentSeconds);
            } else {
                this.stopTimer();
                this.finishTask();
                this.sendTaskFinishedNotification();
            }
        },
        updateTray(seconds) {
            this.$electron.ipcRenderer.send('update-timer', seconds.toString());
        },
        finishTask() {
            this.$store.commit('archiveTask');
        },
        sendTaskFinishedNotification() {
            const notification = {
                title: 'Task is done',
                body: 'Your task is done!',
            };

            const myNotification = new window.Notification(notification.title, notification);

            myNotification.onclick = () => {
                console.log('Notification clicked');
            };
        },
    },
};
</script>

<style>
.timer-wrapper {
    background-color: #2d2f31;
    height: 80px;
    padding: 0px 10px;
    justify-content: center;
}
.button-wrapper {
    display: flex;
    justify-content: center;
    justify-content: space-around;
    padding: 10px;
}
.time-wrapper {
    font-size: 20px;
    color: white;
}
.empty-timer {
    text-align: center;
    padding: 15px;
    color: #f84aa7;
}
</style>
