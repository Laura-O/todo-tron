<template>
    <div class="singleselected">
        <div class="arrows">
            <font-awesome-icon :icon="upArrow" @click="moveTaskUp(task.taskId)"/>
            <font-awesome-icon :icon="downArrow"  @click="moveTaskDown(task.taskId)"/>
        </div>
        <p>{{this.task.text}}</p>        
        <div class="field-wrapper">
            <div class="input-field">
                <b-input size="is-small" type="number" min="0" max="23" v-model="hours" />
            </div>
            <div class="input-field">
                <b-input size="is-small" type="number" min="1" max="59" v-model="minutes"/>
            </div>
        </div>        
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faArrowSquareUp from '@fortawesome/fontawesome-pro-regular/faArrowSquareUp';
import faArrowSquareDown from '@fortawesome/fontawesome-pro-regular/faArrowSquareDown';

export default {
    name: 'selected-element',
    data() {
        return {
            minutes: 20,
            hours: 0,
        };
    },
    components: { FontAwesomeIcon },
    props: ['task'],
    computed: {
        upArrow() {
            return faArrowSquareUp;
        },
        downArrow() {
            return faArrowSquareDown;
        },
    },
    methods: mapActions(['moveTaskUp', 'moveTaskDown']),
};
</script>

<style scoped>
.singleselected {
    font-size: 14px;
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: 50px 1fr 100px;
}

.field-wrapper {
    display: flex;
}
</style>
