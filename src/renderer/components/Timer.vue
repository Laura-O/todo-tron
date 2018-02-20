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
export default {
    name: 'timer',
    data() {
        return {};
    },
    props: [],
    computed: {
        currentSeconds: {
            get() {
                return this.$store.state.Timer.currentTask.seconds;
            },
            set(newValue) {
                this.$store.commit('updateCurrentSeconds', newValue);
            },
        },
    },
    methods: {
        startTimer() {
            this.timer = window.setInterval(this.timerTick, 1000);
        },
        stopTimer() {
            window.clearInterval(this.timer);
        },
        timerTick() {
            if (this.currentSeconds !== 0) {
                this.currentSeconds -= 1;
            } else {
                this.stopTimer();
            }
        },
    },
};
</script>

<style>

</style>
