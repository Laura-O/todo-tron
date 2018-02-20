<template>
    <div class="singleselected">
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
export default {
    name: 'selected-element',
    data() {
        return {
            minutes: 20,
            hours: 0,
        };
    },
    components: {},
    props: ['task'],
    methods: {},
    computed: {},
};
</script>

<style scoped>
.singleselected {
    font-size: 14px;
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: 1fr 100px;
}

.field-wrapper {
    display: flex;
}
</style>
