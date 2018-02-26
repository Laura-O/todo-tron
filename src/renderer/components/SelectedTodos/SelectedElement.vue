<template>
    <div class="singleselected">
        <div class="arrows">
            <font-awesome-icon :icon="upArrow" @click="moveUp(task.taskId)"/>
            <font-awesome-icon :icon="downArrow"  @click="moveDown(task.taskId)"/>
        </div>
        <p>{{this.task.text}}</p>        
        <div class="field-wrapper">    
            <div class="input-field">
                <b-input size="is-small" type="number" min="1" :max="500" value="minutes" v-model="minutes"/>
            </div>
        </div>        
    </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faArrowSquareUp from '@fortawesome/fontawesome-pro-regular/faArrowSquareUp';
import faArrowSquareDown from '@fortawesome/fontawesome-pro-regular/faArrowSquareDown';

// import moment from 'moment';
// import 'moment-duration-format';

export default {
    name: 'selected-element',
    data() {
        return {};
    },
    components: { FontAwesomeIcon },
    props: ['task'],
    computed: {
        minutes: {
            get() {
                const item = this.$store.state.Tasklist.taskList.filter(
                    (todo) => todo.taskId === this.task.taskId,
                );
                return Number.parseInt(item[0].totalSeconds, 10) / 60;
            },
            set(newValue) {
                const newSeconds = newValue * 60;
                this.$store.commit('updateTotalSeconds', { newSeconds, id: this.task.taskId });
            },
        },
        upArrow() {
            return faArrowSquareUp;
        },
        downArrow() {
            return faArrowSquareDown;
        },
        // totalSeconds: {
        //     get() {
        //         const item = this.$store.state.Tasklist.taskList.filter(
        //             (todo) => todo.taskId === this.task.taskId,
        //         );
        //         return Number.parseInt(item[0].totalSeconds, 10);
        //     },
        //     set(newValue) {
        //         this.$store.commit('updateTotalSeconds', { newValue, id: this.task.taskId });
        //     },
        // },
        seconds: {
            get() {
                return this.task.seconds;
            },
            set(newValue) {
                this.$store.commit('updateSeconds', { newValue, id: this.task.taskId });
            },
        },
    },
    methods: {
        moveUp(taskId) {
            if (!this.$store.state.Timer.running) {
                this.$store.commit('moveTaskUp', taskId);
            } else {
                this.warning();
            }
        },
        moveDown(taskId) {
            if (!this.$store.state.Timer.running) {
                this.$store.commit('moveTaskDown', taskId);
            } else {
                this.warning();
            }
        },
        warning() {
            this.$snackbar.open({
                message: 'Please stop the timer before moving tasks',
                type: 'is-danger',
                position: 'is-bottom-right',
                actionText: null,
                queue: false,
            });
        },
    },
};
</script>

<style scoped>
.singleselected {
  font-size: 14px;
  margin-bottom: 5px;
  padding-bottom: 3px;
  border-bottom: 1px solid #f84aa7;
  display: grid;
  grid-template-columns: 50px 1fr 100px;
}

.field-wrapper {
  display: flex;
}
</style>
