<template>
    <b-container class="auction-wrapper">
        <h1 class="title">Auction</h1>
        <AuctionText
            v-for="auction in this.auctions"
            :key="auction.id"
            :id="auction.id"
            :text="auction.text"
            :price="auction.price"
            class="auction-text-helper"
        />
    </b-container>
</template>
<script>
import AuctionText from '@/components/AuctionText';
import { mapState } from 'vuex';
export default {
    name: 'Auction',
    mounted() {
        this.$store.dispatch('allAuctions');
    },
    computed: { ...mapState(['auctions']) },
    components: {
        AuctionText
    }
};
</script>
<style scoped>
.auction-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.auction-text-helper {
    width: 60%;
}
/* .title */
</style>