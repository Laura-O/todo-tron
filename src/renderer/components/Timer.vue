<template>
    <div class="timer-wrapper">        
        <button href="#" v-on:click="startTimer">Start</button>
        <button href="#" v-on:click="stopTimer">Stop</button>
        <div class="timer">
            {{seconds}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'timer',
    data() {
        return {
            seconds: 50,
        };
    },
    methods: {
        startTimer() {
            this.timer = window.setInterval(this.timerTick, 1000);
        },
        stopTimer() {
            window.clearInterval(this.timer);
        },
        timerTick() {
            if (this.seconds !== 0) {
                this.seconds -= 1;
            } else {
                this.stopTimer();
            }
        },
    },
};
</script>

<style>

</style>
