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
        <b-button v-if="!userHasReacted" variant="dark" class="my-btn confirm-button" @click="onClick"
            >Confirm Selection</b-button
        >
    </div>
</template>
<script>
export default {
    name: 'HomeTextReaction',
    props: ['userHasReacted', 'userReaction', 'reactions', 'auctionId'],
    components: {},
    watch: {
        $props: {
            handler() {
                if (this.userHasReacted) {
                    this.options.forEach((option) => {
                        if (option.value !== this.userReaction) {
                            option.disabled = true;
                        }
                    });
                    this.selected = this.userReaction;
                }
                this.options.forEach((option, i) => {
                    let count = this.reactions[option.value];
                    if (count === undefined) {
                        count = 0;
                    }
                    this.values[i] = count;
                });
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            selected: '',
            options: [
                { text: '👍', value: 'like', disabled: false },
                { text: '👎', value: 'dislike', disabled: false },
                { text: '😍', value: 'love', disabled: false },
                { text: '💩', value: 'poop', disabled: false }
            ],
            values: [0, 0, 0, 0]
        };
    },
    methods: {
        onClick() {
            this.$store.dispatch('auctionReact', { auctionId: this.auctionId, type: this.selected }).then(() => {
                this.$store.dispatch('latestBought');
            });
        }
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
