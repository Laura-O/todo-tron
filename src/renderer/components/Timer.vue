<template>
    <div class="timer-wrapper">        
        <button href="#" v-on:click="startTimer">Start</button>
        <button href="#" v-on:click="stopTimer">Stop</button>
        <div class="timer">
            {{currentSeconds}}
        </div>
    </div>
</template>

<script>
// import { ipcRenderer } from 'electron';

export default {
    name: 'timer',
    data() {
        return {};
    },
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
}
</style>
