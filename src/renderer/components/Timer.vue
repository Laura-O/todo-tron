<template>
    <div class="timer-wrapper">
        <div class="button-wrapper">
            <div>
                <a class="button is-primary is-small" v-on:click="startTimer">
                    <font-awesome-icon :icon="playButton" />            
                </a>
                <a class="button is-primary is-small" v-on:click="stopTimer">
                    <font-awesome-icon :icon="pauseButton" />            
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
</template>

<script>
// import { ipcRenderer } from 'electron';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faPlay from '@fortawesome/fontawesome-pro-regular/faPlay';
import faPause from '@fortawesome/fontawesome-pro-regular/faPause';

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
        playButton() {
            return faPlay;
        },
        pauseButton() {
            return faPause;
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
        timerTick() {
            if (this.currentSeconds !== 0) {
                this.currentSeconds -= 1;
                this.updateTray(this.currentSeconds);
            } else {
                this.stopTimer();
            }
        },
        updateTray(seconds) {
            this.$electron.ipcRenderer.send('update-timer', seconds.toString());
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
</style>
