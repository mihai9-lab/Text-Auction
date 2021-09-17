<template>
    <b-container class="home-wrapper">
        <h1 class="title">{{ userAuctions.length > 0 ? userAuctions[0].User.name : 'User not found' }}</h1>
        <HomeText class="home-text-helper" v-for="auction in userAuctions" :key="auction.id" :auction="auction" />
    </b-container>
</template>
<script>
import HomeText from '@/components/HomeText';
import { mapState } from 'vuex';
export default {
    name: 'Home',
    mounted() {
        this.$store.dispatch('userAuctions', this.$route.params.id);
    },
    computed: { ...mapState(['userAuctions']) },
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