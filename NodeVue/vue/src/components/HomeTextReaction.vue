<template>
    <div class="reaction">
        <div>
            <b-form-group class="radios-wrap">
                <b-form-radio-group
                    id="btn-radios-reaction"
                    v-model="selected"
                    :options="options"
                    name="radios-btn-default"
                    buttons
                    button-variant="outline-dark"
                    size="lg"
                ></b-form-radio-group>
            </b-form-group>
            <div class="number-wrap">
                <div v-for="(value, index) in values" :key="index">{{ value }}</div>
            </div>
        </div>
        <b-button variant="dark" class="my-btn confirm-button">Confirm Selection</b-button>
    </div>
</template>
<script>
export default {
    name: 'HomeTextReaction',
    props: ['reactionDisabled'],
    components: {},
    data() {
        let disabled = false;
        if (this.reactionDisabled) {
            disabled = true;
        }
        return {
            selected: 'radio2',
            options: [
                { text: '👍', value: 'radio1', disabled: disabled },
                { text: '👎', value: 'radio2', disabled: disabled },
                { text: '😍', value: 'radio3', disabled: disabled },
                { text: '💩', value: 'radio4', disabled: disabled }
            ],
            values: [1, 1, 1, 1]
        };
    }
};
</script>
<style scoped>
.reaction {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 10px;
}
.radios-wrap {
    margin-bottom: 0px;
}
.confirm-button {
    width: 30%;
    padding: 0% 0%;
    margin-bottom: 22px;
}
.number-wrap {
    display: flex;
    justify-content: space-around;
}

</style>
