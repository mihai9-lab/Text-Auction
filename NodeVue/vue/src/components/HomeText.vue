<template>
    <div class="home-text">
        <b-row class="home-text-title">
            <b-col class="home-text-name" cols="12">
                <router-link :to="`/user/${auction.User.id}`">{{ auction.User.name }}</router-link>
            </b-col>
        </b-row>
        <b-row class="home-text-text-wrap">
            <b-col cols="12" class="home-text-text">{{ auction.text }}</b-col>
        </b-row>
        <HomeTextReaction
            :userHasReacted="auction.userHasReacted"
            :userReaction="auction.reactedWith"
            :reactions="auction.reactions"
            :auctionId="auction.id"
        />
    </div>
</template>
<script>
import HomeTextReaction from '@/components/HomeTextReaction';
export default {
    name: 'HomeText',
    props: ['auction'],
    components: { HomeTextReaction }
};
</script>
<style scoped>
.home-text {
    border: 1px solid black;
    border-radius: 9px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 10px;
    /* width: 100%; */
}
.home-text-name {
    font-size: 22px;
    display: flex;
    align-items: flex-start;
}
.home-text-title {
    width: 100%;
    border-bottom: 1px solid black;
}
.home-text-text {
    font-size: 18px;
    text-align: start;
    line-height: 1.1;
}
.home-text-text-wrap {
    width: 100%;
    border-bottom: 1px solid black;
    padding: 10px 5px;
}
</style>
