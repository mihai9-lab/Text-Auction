<template>
    <div class="auction-text">
        <b-row class="auction-text-text-wrap">
            <b-col cols="12" class="auction-text-text">{{ text }}</b-col>
        </b-row>
        <b-row class="auction-buy-wrap">
            <b-col cols="3" class="auction-buy-price"> Tokens: {{ price }} </b-col>
            <b-col cols="4">
                <b-button variant="dark" class="my-btn confirm-button" @click="onClick">Buy</b-button>
            </b-col>
        </b-row>
        <b-row class="w-100 ml-3">
            <span style="color: red">{{ error }}</span>
        </b-row>
    </div>
</template>
<script>
export default {
    name: 'AuctionText',
    props: ['text', 'price', 'id'],
    data() {
        return {
            error: ''
        };
    },
    methods: {
        onClick() {
            this.$store
                .dispatch('buyAuction', this.id)
                .then(() => {
                    this.$store.dispatch('getTokenCount');
                    this.$store.dispatch('allAuctions');
                })
                .catch((err) => {
                    this.error = err.message;
                });
        }
    }
};
</script>
<style scoped>
.auction-text {
    border: 1px solid black;
    border-radius: 9px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 10px;
    /* width: 100%; */
}
.auction-buy-wrap {
    font-size: 22px;
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-top: 10px;
}
.auction-buy-price {
    display: flex;
    justify-content: center;
    padding-left: 30px;
    text-align: start;
    height: 100%;
    padding: 2px 0;
}
.auction-text-title {
    width: 100%;
    border-bottom: 1px solid black;
}
.auction-text-text {
    font-size: 18px;
    text-align: start;
    line-height: 1.1;
}
.auction-text-text-wrap {
    width: 100%;
    border-bottom: 1px solid black;
    padding: 0px 5px;
    padding-bottom: 10px;
}
.confirm-button {
    width: 100%;
}
</style>
