<template>
    <div class="singleselected box">
        {{this.todo.text}}
        <b-input type="hours" min="1" max="23" v-model="hours"></b-input>
        <b-input type="minutes" min="1" max="59" v-model="minutes"></b-input>
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
    props: ['todo'],
    methods: {},
    computed: {},
};
</script>

<style>
.singleselected {
    margin-bottom: 10px;
}
</style>
