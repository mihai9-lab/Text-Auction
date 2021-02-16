<template>
    <b-container class="auction-wrapper">
        <h1 class="title">Auction</h1>
        <AuctionText
            class="auction-text-helper"
            text="texty texty textytexty textytexty texty texty texty textytextytexty texty texty textytexty texty "
            price="15"
        />
        <AuctionText
            class="auction-text-helper"
            text="texty texty textytexty textytexty texty texty texty textytextytexty texty texty textytexty texty "
            price="20"
        />
    </b-container>
</template>
<script>
import AuctionText from '@/components/AuctionText';
export default {
    name: 'Auction',
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
.auction-text-helper{
    width:60%
}
/* .title */
</style>