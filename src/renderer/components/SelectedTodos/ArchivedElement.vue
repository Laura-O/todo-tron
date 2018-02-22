<template>
    <div class="archivedselected">
       <div class="arrows">
            <font-awesome-icon :icon="upArrow" />
            <font-awesome-icon :icon="downArrow"/>
        </div>
        <p>{{this.task.text}}</p>
       <div class="field-wrapper">    
            <div class="input-field">
                <b-input size="is-small" type="number" min="1" :max="59" disabled/>
            </div>
        </div>        
    </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faArrowSquareUp from '@fortawesome/fontawesome-pro-regular/faArrowSquareUp';
import faArrowSquareDown from '@fortawesome/fontawesome-pro-regular/faArrowSquareDown';

export default {
    name: 'archived-element',
    props: ['task'],
    data() {
        return {};
    },
    components: { FontAwesomeIcon },
    computed: {
        upArrow() {
            return faArrowSquareUp;
        },
        downArrow() {
            return faArrowSquareDown;
        },
    },
};
</script>

<style scoped>
.archivedselected {
    font-size: 14px;
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: 50px 1fr 100px;
    color: grey;
}

.field-wrapper {
    display: flex;
}
</style>
