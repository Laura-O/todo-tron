<template>
    <div class="singleselected box">
        {{this.todo.text}}
        <b-input type="number" min="1" max="180" v-model="minutes"></b-input>
    </div>
</template>

<script>
export default {
    name: 'selected-element',
    data() {
        return {
            minutes: 20,
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
