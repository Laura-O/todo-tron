<template>
  <form action="">
                <div class="modal-card" style="width: auto">                    
                    <section class="modal-card-body">                        
                        <b-field label="Change your todo">
                            <b-input
                                type="text"
                                value="text"
                                v-model="text"                                                                
                                required>
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">Close</button>
                        <button class="button is-primary" @click="save(text)">Save</button>
                    </footer>
                </div>
            </form>
</template>

<script>
export default {
    name: 'card-modal',
    data() {
        return {
            text: this.todo.text,
        };
    },
    props: ['todo'],
    methods: {
        save(text) {
            this.$store.commit('changeTodo', { number: this.todo.number, text });
            this.$parent.close();
            this.$forceUpdate();
        },
    },
};
</script>


<style>

</style>
