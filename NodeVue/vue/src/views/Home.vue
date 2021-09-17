<template>
    <b-container class="home-wrapper">
        <h1 class="title">Latest</h1>
        <HomeText
            class="home-text-helper"
            v-for="auction in latestBoughtAuctions"
            :key="auction.id"
            :auction="auction"
        />
    </b-container>
</template>
<script>
import HomeText from '@/components/HomeText';
import { mapState } from 'vuex';
export default {
    name: 'Home',
    mounted() {
        this.$store.dispatch('latestBought');
    },
    computed: { ...mapState(['latestBoughtAuctions']) },
    components: {
        HomeText
    }
};
</script>
<style scoped>
.home-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.home-text-helper {
    width: 60%;
}
/* .title */
</style>